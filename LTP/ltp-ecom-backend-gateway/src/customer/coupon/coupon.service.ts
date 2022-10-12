import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindCouponCustomerDto } from './dto/find-all-coupon.dto';

@Injectable()
export class CustomerCouponService {
  constructor(private microserviceService: MicroserviceService) {}

  async getCustomerCoupon(curLang: string, data: FindCouponCustomerDto) {
    const result = await this.microserviceService.call(
      'customer-coupon-find-all',
      {
        lang: curLang,
        ...data,
      },
    );

    return result;
  }
}
