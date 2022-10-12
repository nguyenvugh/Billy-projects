import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerAddressService } from './customer-address.service';
import { FindAllCustomerAddressesDto } from './dto/find-all-customer-addresses.dto';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { SetCustomerDefaultAddressDto } from './dto/set-customer-default-address.dto';
import { DeleteOneCustomerAddressDto } from './dto/delete-one-customer-address.dto';

@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @MessagePattern('customer-customer-address-find-all')
  async findAll(reqData: FindAllCustomerAddressesDto) {
    return await this.customerAddressService.findAll(reqData);
  }

  @MessagePattern('customer-customer-address-create-one')
  async createOne(reqData: CreateCustomerAddressDto) {
    return await this.customerAddressService.createOne(reqData);
  }

  @MessagePattern('customer-customer-address-update-one')
  async updateOne(reqData: UpdateCustomerAddressDto) {
    return await this.customerAddressService.updateOne(reqData);
  }

  @MessagePattern('customer-customer-address-set-default')
  async setDefaultAddress(reqData: SetCustomerDefaultAddressDto) {
    return await this.customerAddressService.setDefaultAddress(reqData);
  }

  @MessagePattern('customer-customer-address-delete-one')
  async softDeleteOneCustomerAddress(reqData: DeleteOneCustomerAddressDto) {
    return await this.customerAddressService.softDeleteOneCustomerAddress(
      reqData,
    );
  }
}
