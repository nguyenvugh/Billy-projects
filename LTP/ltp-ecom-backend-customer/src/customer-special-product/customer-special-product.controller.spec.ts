import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSpecialProductController } from './customer-special-product.controller';
import { CustomerSpecialProductService } from './customer-special-product.service';

describe('CustomerSpecialProductController', () => {
  let controller: CustomerSpecialProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSpecialProductController],
      providers: [CustomerSpecialProductService],
    }).compile();

    controller = module.get<CustomerSpecialProductController>(CustomerSpecialProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
