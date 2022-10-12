import { Injectable } from '@nestjs/common';
import { CreateOneCustomerContactFormDto } from './dto/create-one-customer-contact-form.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CustomerContactFormService {
  constructor(private microserviceService: MicroserviceService) {}

  async createOneCustomerContactForm(reqData: CreateOneCustomerContactFormDto) {
    return await this.microserviceService.call(
      'customer-customer-contact-form-create-one-customer-contact-form',
      reqData,
    );
  }
}
