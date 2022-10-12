import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOneCustomerContactFormDto } from './dto/create-one-customer-contact-form.dto';
import { CustomerContactFormService } from './customer-contact-form.service';

@Controller('customer-contact-form')
export class CustomerContactFormController {
  constructor(
    private readonly customerContactFormService: CustomerContactFormService,
  ) {}

  @MessagePattern(
    'customer-customer-contact-form-create-one-customer-contact-form',
  )
  async createOneCustomerContactForm(reqData: CreateOneCustomerContactFormDto) {
    return await this.customerContactFormService.createOneCustomerContactForm(
      reqData,
    );
  }
}
