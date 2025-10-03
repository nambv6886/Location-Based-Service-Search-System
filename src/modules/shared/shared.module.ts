import { Module } from '@nestjs/common';
import { RedisClientProvider } from './redis-client.provider';
import { ConfigModule } from '../../config/config.module';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    RedisClientProvider,
    EmailService,
  ],
  exports: [RedisClientProvider, EmailService],
})
export class SharedModule {}
