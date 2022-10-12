import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { FindAllCustomerContactFormsDto } from './dto/find-all-customer-contact-forms.dto';
import { DeleteMultiCustomerContactFormsDto } from './dto/delete-multi-customer-contact-forms.dto';
import { CustomerContactFormService } from './customer-contact-form.service';

@Controller('customer-contact-form')
@UseGuards(AuthGuard, PermissionsGuard)
export class CustomerContactFormController {
  constructor(
    private readonly customerContactFormService: CustomerContactFormService,
  ) {}

  @MessagePattern('admin-customer-contact-form-find-all-customer-contact-forms')
  @Permissions('customer_contact_form')
  async findAllCustomerContactForms({
    body,
  }: {
    body: FindAllCustomerContactFormsDto;
  }) {
    return await this.customerContactFormService.findAllCustomerContactForms(
      body,
    );
  }

  @MessagePattern(
    'admin-customer-contact-form-delete-multi-customer-contact-forms',
  )
  @Permissions('customer_contact_form')
  async deleteMultiCustomerContactForms({
    body,
  }: {
    body: DeleteMultiCustomerContactFormsDto;
  }) {
    return await this.customerContactFormService.deleteMultiCustomerContactForms(
      body,
    );
  }
}
