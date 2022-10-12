import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { LocalCustomerAuthGuard } from '../../common/guards/passport-local-customer-auth.guard';
import { AuthReq } from '../../common/decorators/auth-req.decorator';
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { CustomerLoginDto } from './dto/login.dto';
import { CustomerSocialLoginDto } from './dto/social-login.dto';
import { ForgetPasswordGenCodeDto } from './dto/forget-password-gen-code.dto';
import { ForgetPasswordSetNewPasswordDto } from './dto/forget-password-set-new-password.dto';
import { ConfirmActivationCodeDto } from './dto/confirm-activation-code.dto';
import { RegisterEntity } from './entities/register.entity';
import { LoginEntity } from './entities/login.entity';
import { ForgetPasswordGenCodeEntity } from './entities/forget-password-gen-code.entity';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/auth`)
@ApiTags('Customer Authenticate')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async register(@CurrentLang() curLang, @Body() registerData: RegisterDto) {
    return new RegisterEntity(
      await this.authService.register(curLang, registerData),
    );
  }

  @UseGuards(LocalCustomerAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Login on web customer' })
  @ApiBody({
    type: CustomerLoginDto,
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(@AuthReq() customer: any) {
    return new LoginEntity(this.authService.loginCustomer(customer));
  }

  @Post('/login/social')
  @ApiOperation({ summary: 'Social login on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async socialLogin(@Body() data: CustomerSocialLoginDto) {
    return new LoginEntity(await this.authService.socialLogin(data));
  }

  @Post('/forget-password-gen-code')
  @ApiOperation({ summary: 'Generate forget password code on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async forgetPasswordGenCode(
    @CurrentLang() curLang,
    @Body() data: ForgetPasswordGenCodeDto,
  ) {
    return new ForgetPasswordGenCodeEntity(
      await this.authService.forgetPasswordGenCode(curLang, data),
    );
  }

  @Post('/forget-password-set-new-password')
  @ApiOperation({
    summary: 'Set new password when forget password on web customer',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async forgetPasswordSetNewPassword(
    @Body() data: ForgetPasswordSetNewPasswordDto,
  ) {
    return new ForgetPasswordGenCodeEntity(
      await this.authService.forgetPasswordSetNewPassword(data),
    );
  }

  @Post('/confirm-activation-code')
  @ApiOperation({
    summary: 'Confirm activation code on web customer',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async confirmActivationCode(@Body() data: ConfirmActivationCodeDto) {
    return new ForgetPasswordGenCodeEntity(
      await this.authService.confirmActivationCode(data),
    );
  }

  /*
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  */
}
