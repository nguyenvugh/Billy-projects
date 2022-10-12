import { Controller } from '@nestjs/common';
import { OrderPaymentHistoryService } from './order-payment-history.service';

@Controller('order-payment-history')
export class OrderPaymentHistoryController {
  constructor(private readonly orderPaymentHistoryService: OrderPaymentHistoryService) {}
}
