import { IResponse } from "src/models/interfaces/i-response";
import { ResponseMessage } from "src/models/interfaces/response.message.model";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";
import { MessageCode } from "../../../common/constants/message-code.constant";
import { EMAIL_REGEX } from "../../../common/constants/common";
import { Matches } from "class-validator";

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty({ message: MessageCode.EMAIL_IS_REQUIRED })
  @Matches(EMAIL_REGEX, { message: MessageCode.EMAIL_IS_INVALID })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: MessageCode.PASSWORD_IS_REQUIRED })
  password: string;
}

export class LoginResponse implements IResponse {
  @ApiProperty()
  responseMessage: ResponseMessage;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshAccessToken: string;

  constructor(fields?: Partial<LoginResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}