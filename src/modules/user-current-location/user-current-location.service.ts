import { Injectable } from '@nestjs/common';
import { CreateUserCurrentLocationDto } from './dto/create-user-current-location.dto';
import { UpdateUserCurrentLocationDto } from './dto/update-user-current-location.dto';

@Injectable()
export class UserCurrentLocationService {
  create(createUserCurrentLocationDto: CreateUserCurrentLocationDto) {
    return 'This action adds a new userCurrentLocation';
  }

  findAll() {
    return `This action returns all userCurrentLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCurrentLocation`;
  }

  update(id: number, updateUserCurrentLocationDto: UpdateUserCurrentLocationDto) {
    return `This action updates a #${id} userCurrentLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCurrentLocation`;
  }
}
