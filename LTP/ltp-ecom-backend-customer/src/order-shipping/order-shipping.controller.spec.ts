import { Test, TestingModule } from '@nestjs/testing';
import { OrderShippingController } from './order-shipping.controller';
import { OrderShippingService } from './order-shipping.service';

describe('OrderShippingController', () => {
  let controller: OrderShippingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderShippingController],
      providers: [OrderShippingService],
    }).compile();

    controller = module.get<OrderShippingController>(OrderShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
