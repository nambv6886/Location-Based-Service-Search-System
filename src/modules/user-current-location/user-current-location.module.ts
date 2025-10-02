import { Module } from '@nestjs/common';
import { UserCurrentLocationService } from './user-current-location.service';
import { UserCurrentLocationController } from './user-current-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCurrentLocationEntity } from './entities/user-current-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCurrentLocationEntity])],
  controllers: [UserCurrentLocationController],
  providers: [UserCurrentLocationService],
})
export class UserCurrentLocationModule {}
