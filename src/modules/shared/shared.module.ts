import { Module } from '@nestjs/common';
import { RedisClientProvider } from './redis-client.provider';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    RedisClientProvider,
    EmailService,
  ],
  exports: [RedisClientProvider, EmailService],
})
export class SharedModule {}
