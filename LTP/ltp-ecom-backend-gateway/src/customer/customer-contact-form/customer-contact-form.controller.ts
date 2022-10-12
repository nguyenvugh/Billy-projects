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
import { MicroserviceConsts } from '../../common/constants/microservices';
import { CreateOneCustomerContactFormDto } from './dto/create-one-customer-contact-form.dto';
import { CustomerContactFormService } from './customer-contact-form.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/customer-contact-form`)
@ApiTags('Customer Contact Form')
export class CustomerContactFormController {
  constructor(
    private readonly customerContactFormService: CustomerContactFormService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit customer contact form' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createOneCustomerContactForm(
    @Body() reqData: CreateOneCustomerContactFormDto,
  ) {
    return await this.customerContactFormService.createOneCustomerContactForm(
      reqData,
    );
  }
}
