import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllTypesDto } from './dto/find-all-types.dto';
import { CalculateOnlinePaymentTaxDto } from './dto/calculate-online-payment-tax.dto';
import { OrderPaymentService } from './order-payment.service';

@Controller('order-payment')
export class OrderPaymentController {
  constructor(private readonly orderPaymentService: OrderPaymentService) {}

  @MessagePattern('customer-order-payment-find-all-types')
  async getListPaymentTypes(reqData: FindAllTypesDto) {
    return await this.orderPaymentService.getListPaymentTypes(reqData);
  }

  @MessagePattern('customer-order-payment-ipn-update-payment')
  async ipnUpdatePayment(response: any) {
    return await this.orderPaymentService.ipnUpdatePayment(response);
  }

  @MessagePattern('customer-order-payment-calculate-online-payment-tax')
  async calculateOnlinePaymentTax(reqData: CalculateOnlinePaymentTaxDto) {
    return await this.orderPaymentService.calculateOnlinePaymentTax(reqData);
  }
}
