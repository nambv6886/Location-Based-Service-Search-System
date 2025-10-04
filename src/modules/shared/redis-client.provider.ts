import { Logger } from '@nestjs/common';
import redis = require('redis');

import { REDIS_CLIENT } from '../../common/constants/common';
import { ConfigService } from '@nestjs/config';

export const RedisClientProvider = {
  imports: [],
  provide: REDIS_CLIENT,
  useFactory: async (config: ConfigService) => {
    const redisUrl = config.get('REDIS_URL');
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
