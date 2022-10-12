import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { FindAllCustomerContactFormsDto } from './dto/find-all-customer-contact-forms.dto';
import { DeleteMultiCustomerContactFormsDto } from './dto/delete-multi-customer-contact-forms.dto';
import { CustomerContactFormService } from './customer-contact-form.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/customer-contact-form`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Admin Customer Contact Forms Management')
@ApiBearerAuth()
export class CustomerContactFormController {
  constructor(
    private readonly customerContactFormService: CustomerContactFormService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list customer contact forms' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllCustomerContactForms(
    @Query() reqData: FindAllCustomerContactFormsDto,
    @AuthToken() authorization: string,
  ) {
    return await this.customerContactFormService.findAllCustomerContactForms(
      authorization,
      reqData,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete multi customer contact forms' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async deleteMultiCustomerContactForms(
    @Query() reqData: DeleteMultiCustomerContactFormsDto,
    @AuthToken() authorization: string,
  ) {
    return await this.customerContactFormService.deleteMultiCustomerContactForms(
      authorization,
      reqData,
    );
  }
}
