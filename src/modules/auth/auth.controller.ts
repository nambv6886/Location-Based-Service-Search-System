import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './dto/auth.dto';
import { LoginResponse } from './dto/auth.dto';
  
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'login'
  })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @Post('login')
  login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginRequest);
  }

  
}
