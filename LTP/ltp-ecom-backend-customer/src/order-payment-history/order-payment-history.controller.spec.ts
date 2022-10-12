import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentHistoryController } from './order-payment-history.controller';
import { OrderPaymentHistoryService } from './order-payment-history.service';

describe('OrderPaymentHistoryController', () => {
  let controller: OrderPaymentHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPaymentHistoryController],
      providers: [OrderPaymentHistoryService],
    }).compile();

    controller = module.get<OrderPaymentHistoryController>(OrderPaymentHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
