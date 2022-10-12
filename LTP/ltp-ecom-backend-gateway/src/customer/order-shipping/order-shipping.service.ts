import { Injectable } from '@nestjs/common';
import { FindAllTypesDto } from './dto/find-all-types.dto';
import { IpnUpdateShippingDto } from './dto/ipn-update-shipping.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class OrderShippingService {
  constructor(private microserviceService: MicroserviceService) {}

  async getListShippingTypes(reqData: FindAllTypesDto) {
    const results = await this.microserviceService.call(
      'customer-order-shipping-find-all-types',
      reqData,
    );
    return {
      results,
    };
  }

  async calculateShippingPrice(data: any) {
    return await this.microserviceService.call(
      'customer-order-shipping-calculate-shipping-price',
      data,
    );
  }

  async ipnUpdateShipping(request: IpnUpdateShippingDto) {
    return await this.microserviceService.call(
      'customer-order-shipping-ipn-update-shipping',
      request,
    );
  }
}
