import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, CreateUserResponse, DeleteUserResponse, GetUserListResponse, GetUserResponse, UpdateUserDto, UpdateUserResponse } from './dto/user.dto';
import { GetListRequest } from '../../models/pagination/pagination.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @ApiOperation({
    description: 'create user'
  })
  @ApiResponse({
    status: 200,
    type: CreateUserResponse,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'get list user'
  })
  @ApiResponse({
    status: 200,
    type: GetUserListResponse,
  })
  @Get()
  findAll(@Query() getListRequest: GetListRequest): Promise<GetUserListResponse> {
    return this.usersService.findAll(getListRequest);
  }

  @ApiOperation({
    description: 'get user by id'
  })
  @ApiResponse({
    status: 200,
    type: GetUserResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetUserResponse> {
    return this.usersService.getDetails(id);
  }

  @ApiOperation({
    description: 'update user'
  })
  @ApiResponse({
    status: 200,
    type: UpdateUserResponse,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    description: 'delete user'
  })
  @ApiResponse({
    status: 200,
    type: DeleteUserResponse,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
