import { Module } from '@nestjs/common';
import { RedisClientProvider } from './redis-client.provider';
import { EmailService } from './email.service';
import { BloomFilterService } from './bloom-filter.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisClientProvider, EmailService, BloomFilterService],
  exports: [RedisClientProvider, EmailService, BloomFilterService],
})
export class SharedModule {}
