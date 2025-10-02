import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginRequest, LoginResponse } from './dto/auth.dto';
import { ResponseMessage } from '../../models/interfaces/response.message.model';
import { ResponseStatus } from '../../models/interfaces/response.status.model';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '../../config/config.service';
import { MessageCode } from '../../common/constants/message-code.constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.validateUser(loginRequest.email, loginRequest.password);
    if (!user) {
      return new LoginResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: MessageCode.FAIL,
        })
      })
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME'),
    })
    const refreshAccessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME'),
    })

    return new LoginResponse({
      responseMessage: new ResponseMessage({
        status: ResponseStatus.Success,
        messageCode: MessageCode.SUCCESS,
      }),
      accessToken,
      refreshAccessToken,
    })
  }
}
