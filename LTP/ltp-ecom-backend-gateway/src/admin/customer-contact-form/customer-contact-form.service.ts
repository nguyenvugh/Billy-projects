import { Injectable } from '@nestjs/common';
import { FindAllCustomerContactFormsDto } from './dto/find-all-customer-contact-forms.dto';
import { DeleteMultiCustomerContactFormsDto } from './dto/delete-multi-customer-contact-forms.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CustomerContactFormService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAllCustomerContactForms(
    authorization,
    body: FindAllCustomerContactFormsDto,
  ) {
    return await this.microserviceService.call(
      'admin-customer-contact-form-find-all-customer-contact-forms',
      {
        body,
        authorization,
      },
    );
  }

  async deleteMultiCustomerContactForms(
    authorization,
    body: DeleteMultiCustomerContactFormsDto,
  ) {
    return await this.microserviceService.call(
      'admin-customer-contact-form-delete-multi-customer-contact-forms',
      {
        body,
        authorization,
      },
    );
  }
}
