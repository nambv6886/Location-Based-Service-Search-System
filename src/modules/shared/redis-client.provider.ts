import { Logger } from '@nestjs/common';
import redis = require('redis');

import { REDIS_CLIENT } from '../../common/constants/common';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

export const RedisClientProvider = {
  imports: [ConfigModule],
  provide: REDIS_CLIENT,
  useFactory: async (config: ConfigService) => {
    const redisUrl = config.get('redis');
    const client = redis.createClient({
      url: redisUrl
    });

    client.on('error', (error) => {
      Logger.error(`[RedisClientProvider] Error:  + ${JSON.stringify(error)}`);
    });

    client.on('connect', () => {
      Logger.log(
        `[RedisClientProvider] Connected to Redis at ${redisUrl}`,
      );
    });

    await client.connect();

    return client;
  },
  inject: [ConfigService],
};
