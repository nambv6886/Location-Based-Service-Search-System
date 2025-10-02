import { Module } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { UserFavoritesController } from './user-favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteEntity } from './entities/user-favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteEntity])],
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService],
})
export class UserFavoritesModule {}
