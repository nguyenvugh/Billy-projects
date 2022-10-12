import { Injectable } from '@nestjs/common';
import { FindAllPaymentTypesDto } from './dto/find-all-types.dto';
import { CalculateOnlinePaymentTaxDto } from './dto/calculate-online-payment-tax.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class OrderPaymentService {
  constructor(private microserviceService: MicroserviceService) {}

  async getListPaymentTypes(reqData: FindAllPaymentTypesDto) {
    const results = await this.microserviceService.call(
      'customer-order-payment-find-all-types',
      reqData,
    );
    return { results };
  }

  async calculateOnlinePaymentTax(reqData: CalculateOnlinePaymentTaxDto) {
    const results = await this.microserviceService.call(
      'customer-order-payment-calculate-online-payment-tax',
      reqData,
    );
    return { results };
  }

  async ipnUpdatePayment(response: any) {
    const results = await this.microserviceService.call(
      'customer-order-payment-ipn-update-payment',
      response,
    );
    return results;
  }
}
