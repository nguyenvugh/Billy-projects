import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateOneCustomerContactFormDto } from './dto/create-one-customer-contact-form.dto';
import { CustomerContactFormRepository } from './repository/customer-contact-form.repository';

@Injectable()
export class CustomerContactFormService {
  constructor(
    private customerContactFormRepo: CustomerContactFormRepository,
    private i18n: I18nService,
  ) {}

  async createOneCustomerContactForm(reqData: CreateOneCustomerContactFormDto) {
    return await this.customerContactFormRepo.save(reqData);
  }
}
