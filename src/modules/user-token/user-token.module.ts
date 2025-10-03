import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenEntity } from './entities/user-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTokenEntity])],
  controllers: [],
  providers: [UserTokenService],
})
export class UserTokenModule {}
