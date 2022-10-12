import { Controller } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { ForgetPasswordGenCodeDto } from './dto/forget-password-gen-code.dto';
import { ForgetPasswordSetNewPasswordDto } from './dto/forget-password-set-new-password.dto';
import { ConfirmActivationCodeDto } from './dto/confirm-activation-code.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('customer-register')
  async register(registerData: RegisterDto) {
    return await this.authService.register(registerData);
  }

  @MessagePattern('customer-login')
  async login(loginData: LoginDto) {
    return await this.authService.login(loginData);
  }

  @MessagePattern('customer-social-login')
  async socialLogin(loginData: SocialLoginDto) {
    return await this.authService.socialLogin(loginData);
  }

  @MessagePattern('customer-forget-password-gen-code')
  async forgetPasswordGenCode(data: ForgetPasswordGenCodeDto) {
    return await this.authService.forgetPasswordGenCode(data);
  }

  @MessagePattern('customer-forget-password-set-new-password')
  async forgetPasswordSetNewPass(data: ForgetPasswordSetNewPasswordDto) {
    return await this.authService.forgetPasswordSetNewPass(data);
  }

  @MessagePattern('customer-confirm-activation-code')
  async confirmActivationCode(data: ConfirmActivationCodeDto) {
    return await this.authService.confirmActivationCode(data);
  }

  @MessagePattern('customer-auth-test')
  test() {
    return this.authService.test();
  }
}
