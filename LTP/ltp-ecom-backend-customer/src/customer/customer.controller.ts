import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GetCustomerProfileDto } from './dto/get-customer-profile.dto';
import { IntergrateSocialAccountDto } from './dto/intergrate-social-account.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern('customer-customer-find-one')
  async findOne(id: number) {
    return await this.customerService.findOne(id);
  }

  @MessagePattern('customer-customer-get-customer-profile')
  async getCustomerProfile(reqData: GetCustomerProfileDto) {
    return await this.customerService.getCustomerProfile(reqData);
  }

  @MessagePattern('customer-customer-update-customer-profile')
  async updateCustomerProfile(reqData: UpdateCustomerProfileDto) {
    return await this.customerService.updateCustomerProfile(reqData);
  }

  @MessagePattern('customer-customer-intergrate-customer-social-account')
  async intergrateCustomerSocialAccount(reqData: IntergrateSocialAccountDto) {
    return await this.customerService.intergrateCustomerSocialAccount(reqData);
  }

  @MessagePattern('customer-customer-update-customer-password')
  async updateCustomerPassword(reqData: UpdateCustomerPasswordDto) {
    return await this.customerService.updateCustomerPassword(reqData);
  }

  /*
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
  */
}
