import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentHistoryService } from './order-payment-history.service';

describe('OrderPaymentHistoryService', () => {
  let service: OrderPaymentHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPaymentHistoryService],
    }).compile();

    service = module.get<OrderPaymentHistoryService>(OrderPaymentHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
