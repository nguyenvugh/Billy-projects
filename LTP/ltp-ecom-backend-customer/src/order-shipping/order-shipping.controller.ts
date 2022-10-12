import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllTypesDto } from './dto/find-all-types.dto';
import { GetCustomerOrderShippingDto } from './dto/get-customer-order-shipping.dto';
import { IpnUpdateShippingDto } from './dto/ipn-update-shipping.dto';
import { OrderShippingService } from './order-shipping.service';

@Controller('order-shipping')
export class OrderShippingController {
  constructor(private readonly orderShippingService: OrderShippingService) {}

  @MessagePattern('customer-order-shipping-find-all-types')
  async getListShippingTypes(reqData: FindAllTypesDto) {
    return await this.orderShippingService.getListShippingTypes(reqData);
  }

  @MessagePattern('customer-order-shipping-calculate-shipping-price')
  async calculateShippingPrice(reqData: any) {
    return await this.orderShippingService.calculateShippingPrice(reqData);
  }

  @MessagePattern('customer-order-shipping-ipn-update-shipping')
  async ipnUpdateShipping(reqData: IpnUpdateShippingDto) {
    return await this.orderShippingService.ipnUpdateShipping(reqData);
  }

  @MessagePattern('customer-order-shipping-get-order-shipping')
  async getCustomerOrderShipping(reqData: GetCustomerOrderShippingDto) {
    return await this.orderShippingService.getCustomerOrderShipping(reqData);
  }
}
