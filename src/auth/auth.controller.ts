import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async login(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async register(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(AuthMiddleware)
  @Get('me')
  async me(@Request() request) {
    return request.user;
  }
}
