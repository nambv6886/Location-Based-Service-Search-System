import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ResponseMessage } from '../../models/interfaces/response.message.model';
import { ResponseStatus } from '../../models/interfaces/response.status.model';

import {
  CreateUserDto,
  CreateUserResponse,
  GetUserListResponse,
  GetUserResponse,
  UpdateUserDto,
  UserInfo,
  UpdateUserResponse,
} from './dto/user.dto';
import { GetListRequest } from 'src/models/pagination/pagination.model';
import { UserEntity } from './entities/user.entity';
import { CommonUtils } from '../../common/utils/common.utils';
import { MessageCode } from '../../common/constants/message-code.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const user = await this.usersRepository.findOneBy({ 
        email: createUserDto.email,
        isActive: true
       });
      if (CommonUtils.isNotNullOrUndefined(user)) {
        return new CreateUserResponse({
          responseMessage: new ResponseMessage({
            status: ResponseStatus.Fail,
            messageCode: MessageCode.EMAIL_IS_EXISTED
          })
        })
      }

      // reference user
      let referenceUserId = 0;

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.usersRepository.create({
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
      });
      await this.usersRepository.save(newUser);

      // send email verify
      return new CreateUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Success,
          messageCode: MessageCode.SUCCESS,
        }),
        referenceUserId,
      })
    } catch (error) {
      Logger.error(error);
      return new CreateUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: MessageCode.FAIL,
        })
      })
    }
  }

  async findAll(getListRequest: GetListRequest): Promise<GetUserListResponse> {
    try {

      const [users, count] = await this.usersRepository.findAndCount({
        where: {
          isActive: true
        },
        skip: getListRequest.pageIndex,
        take: getListRequest.pageSize,
      });

      const userList = users.map(user => {
        return new UserInfo(user);
      });

      return new GetUserListResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Success,
          messageCode: MessageCode.SUCCESS,
        }),
        users: userList,
        totalItemCount: count,
        pageIndex: getListRequest.pageIndex,
        pageSize: getListRequest.pageSize,
      })
    } catch (error) {
      Logger.error(error);
      return new GetUserListResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: MessageCode.FAIL,
        }),
        users: [],
        totalItemCount: 0,
      })
    }
  }

  async getDetails(id: string): Promise<GetUserResponse> {
    const user = await this.usersRepository.findOneBy({ id, isActive: true });
    if (CommonUtils.isNullOrUndefined(user)) {
      return new GetUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: MessageCode.NOT_FOUND,
        })
      })
    }

    const userInfo = new UserInfo(user);
    return new GetUserResponse({
      responseMessage: new ResponseMessage({
        status: ResponseStatus.Success,
        messageCode: MessageCode.SUCCESS,
      }),
      account: userInfo,
    });
  }

  async findOneById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id, isActive: true });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email, isActive: true });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.findOneBy({ id, isActive: true });
    if (CommonUtils.isNullOrUndefined(user)) {
      return new UpdateUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: MessageCode.NOT_FOUND,
        })
      })
    }

    const { password } = updateUserDto;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    user.password = hashedPassword;
    const userUpdated = await this.usersRepository.update({ id, isActive: true }, user);
    return new UpdateUserResponse({
      responseMessage: new ResponseMessage({
        status: ResponseStatus.Success,
        messageCode: MessageCode.SUCCESS,
      }),
    })
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id, isActive: true });
    if (CommonUtils.isNullOrUndefined(user)) {
      return new UpdateUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: MessageCode.NOT_FOUND,
        })
      })
    }
    user.isActive = false;
    await this.usersRepository.save(user);
    return new UpdateUserResponse({
      responseMessage: new ResponseMessage({
        status: ResponseStatus.Success,
        messageCode: MessageCode.SUCCESS,
      }),
    })
  }
}
