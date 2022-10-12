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
  Query,
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
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Controller('email')
@ApiTags('Test Send Email')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {}

  @Get('/customer/test/confirm_email_register')
  async testCustomerSendConfirmEmailRegister() {
    const data = {
      url: '#',
      subscribe_url: '#',
      email: this.configService.get<string>('web.customer.email_support'),
      phone: this.configService.get<string>('web.customer.phone_support'),
    };
    return await this.mailService.send(
      'cong@tesosoft.com',
      'Test',
      'customer_confirm_email.vi',
      data,
    );
  }
}
