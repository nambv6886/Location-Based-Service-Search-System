import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../../config/config.module';
import { SharedModule } from '../shared/shared.module';
import { UserTokenModule } from '../user-token/user-token.module';

@Module({
  imports: [
    ConfigModule, 
    SharedModule,
    UserTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
