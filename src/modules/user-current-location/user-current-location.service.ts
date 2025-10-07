import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCurrentLocationDto } from './dto/create-user-current-location.dto';
import { UpdateUserCurrentLocationDto } from './dto/update-user-current-location.dto';
import { UserCurrentLocationEntity } from './entities/user-current-location.entity';
import { RedisService } from '../shared/redis.service';
import { GetUserLocationDto } from './dto/get-user-location.dto';

@Injectable()
export class UserCurrentLocationService {
  private readonly logger = new Logger(UserCurrentLocationService.name);
  private readonly CACHE_TTL = 5 * 60; // 5 minutes in seconds
  private readonly LOCK_TTL = 5; // 5 seconds
  private readonly CACHE_PREFIX = 'user:location:';
  private readonly LOCK_PREFIX = 'lock:user:location:';

  constructor(
    @InjectRepository(UserCurrentLocationEntity)
    private readonly locationRepository: Repository<UserCurrentLocationEntity>,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Get cache key for a user's location
   */
  private getCacheKey(userId: string): string {
    return `${this.CACHE_PREFIX}${userId}`;
  }

  /**
   * Get lock key for a user's location update
   */
  private getLockKey(userId: string): string {
    return `${this.LOCK_PREFIX}${userId}`;
  }

  /**
   * Update or create user's current location with Redis caching and distributed locking
   * Handles high concurrency scenarios
   */
  async updateLocation(
    userId: string,
    updateDto: UpdateUserCurrentLocationDto,
  ): Promise<GetUserLocationDto> {
    const lockKey = this.getLockKey(userId);

    try {
      // Use distributed lock to handle concurrent updates for the same user
      return await this.redisService.withLock(
        lockKey,
        async () => {
          return await this.performLocationUpdate(userId, updateDto);
        },
        {
          ttlSeconds: this.LOCK_TTL,
          retryTimes: 5,
          retryDelayMs: 100,
        },
      );
    } catch (error) {
      this.logger.error(`Failed to update location for user ${userId}:`, error);

      if (error.message?.includes('Failed to acquire lock')) {
        throw new ConflictException(
          'Location update in progress, please try again',
        );
      }

      throw new InternalServerErrorException('Failed to update location');
    }
  }

  /**
   * Perform the actual location update (called within lock)
   */
  private async performLocationUpdate(
    userId: string,
    updateDto: UpdateUserCurrentLocationDto,
  ): Promise<GetUserLocationDto> {
    const { latitude, longitude } = updateDto;

    try {
      // Find existing location for this user
      const existingLocation = await this.locationRepository.findOne({
        where: { userId },
        select: ['id', 'userId', 'latitude', 'longitude', 'updatedAt'],
      });

      let savedLocation: UserCurrentLocationEntity;

      if (existingLocation) {
        // Update existing location using query builder to handle POINT geometry
        // Note: SRID 4326 expects POINT(latitude longitude) in MySQL
        await this.locationRepository
          .createQueryBuilder()
          .update(UserCurrentLocationEntity)
          .set({
            latitude,
            longitude,
            location: () =>
              `ST_GeomFromText('POINT(${latitude} ${longitude})', 4326)`,
          })
          .where('id = :id', { id: existingLocation.id })
          .execute();

        // Fetch the updated location
        savedLocation = await this.locationRepository.findOne({
          where: { id: existingLocation.id },
          select: ['id', 'userId', 'latitude', 'longitude', 'updatedAt'],
        });
      } else {
        // Create new location entry using query builder
        // Note: SRID 4326 expects POINT(latitude longitude) in MySQL
        const result = await this.locationRepository
          .createQueryBuilder()
          .insert()
          .into(UserCurrentLocationEntity)
          .values({
            userId,
            latitude,
            longitude,
            location: () =>
              `ST_GeomFromText('POINT(${latitude} ${longitude})', 4326)`,
          })
          .execute();

        // Fetch the newly created location
        savedLocation = await this.locationRepository.findOne({
          where: { id: result.identifiers[0].id },
          select: ['id', 'userId', 'latitude', 'longitude', 'updatedAt'],
        });
      }

      // Update cache
      const cacheData: GetUserLocationDto = {
        userId: userId,
        latitude: savedLocation.latitude,
        longitude: savedLocation.longitude,
        updatedAt: savedLocation.updatedAt,
      };

      await this.cacheLocation(userId, cacheData);

      this.logger.log(`Location updated for user ${userId}`);
      return cacheData;
    } catch (error) {
      this.logger.error(
        `Database error updating location for user ${userId}:`,
        error,
      );
      throw new InternalServerErrorException('Failed to save location');
    }
  }

  /**
   * Get user's current location from cache or database
   */
  async getLocation(userId: string): Promise<GetUserLocationDto> {
    try {
      // Try to get from cache first
      const cachedLocation = await this.getCachedLocation(userId);
      if (cachedLocation) {
        this.logger.debug(`Cache hit for user ${userId}`);
        return cachedLocation;
      }

      this.logger.debug(`Cache miss for user ${userId}, fetching from DB`);

      // Cache miss - fetch from database
      const location = await this.locationRepository.findOne({
        where: {
          userId,
        },
        select: ['id', 'userId', 'latitude', 'longitude', 'updatedAt'],
      });

      if (!location) {
        throw new NotFoundException(`Location not found for user ${userId}`);
      }

      const locationDto: GetUserLocationDto = {
        userId: userId,
        latitude: location.latitude,
        longitude: location.longitude,
        updatedAt: location.updatedAt,
      };

      // Cache for future requests
      await this.cacheLocation(userId, locationDto);

      return locationDto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(`Error getting location for user ${userId}:`, error);
      throw new InternalServerErrorException('Failed to retrieve location');
    }
  }

  /**
   * Cache location data in Redis
   */
  private async cacheLocation(
    userId: string,
    location: GetUserLocationDto,
  ): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(userId);
      const cacheValue = JSON.stringify(location);
      await this.redisService.set(cacheKey, cacheValue, this.CACHE_TTL);
    } catch (error) {
      // Log error but don't fail the operation if caching fails
      this.logger.warn(`Failed to cache location for user ${userId}:`, error);
    }
  }

  /**
   * Get cached location from Redis
   */
  private async getCachedLocation(
    userId: string,
  ): Promise<GetUserLocationDto | null> {
    try {
      const cacheKey = this.getCacheKey(userId);
      const cachedValue = await this.redisService.get(cacheKey);

      if (!cachedValue) {
        return null;
      }

      const location = JSON.parse(cachedValue);
      // Convert updatedAt string back to Date
      location.updatedAt = new Date(location.updatedAt);
      return location;
    } catch (error) {
      this.logger.warn(`Error reading cache for user ${userId}:`, error);
      return null;
    }
  }

  /**
   * Invalidate cache for a user
   */
  async invalidateCache(userId: string): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(userId);
      await this.redisService.del(cacheKey);
      this.logger.debug(`Cache invalidated for user ${userId}`);
    } catch (error) {
      this.logger.warn(`Failed to invalidate cache for user ${userId}:`, error);
    }
  }
}
