import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCurrentLocationService } from './user-current-location.service';
import { CreateUserCurrentLocationDto } from './dto/create-user-current-location.dto';
import { UpdateUserCurrentLocationDto } from './dto/update-user-current-location.dto';

@Controller('user-current-location')
export class UserCurrentLocationController {
  constructor(private readonly userCurrentLocationService: UserCurrentLocationService) {}

  @Post()
  create(@Body() createUserCurrentLocationDto: CreateUserCurrentLocationDto) {
    return this.userCurrentLocationService.create(createUserCurrentLocationDto);
  }

  @Get()
  findAll() {
    return this.userCurrentLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCurrentLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCurrentLocationDto: UpdateUserCurrentLocationDto) {
    return this.userCurrentLocationService.update(+id, updateUserCurrentLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCurrentLocationService.remove(+id);
  }
}
