import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { UserTokenModule } from '../user-token/user-token.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    SharedModule,
    UserTokenModule,
    UsersModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
