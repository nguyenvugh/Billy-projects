import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('admin-auth')
  login(loginRequest: any) {
    return this.authService.login(loginRequest);
  }
}
