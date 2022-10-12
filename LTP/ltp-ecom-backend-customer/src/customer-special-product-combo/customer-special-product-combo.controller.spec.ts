import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSpecialProductComboController } from './customer-special-product-combo.controller';
import { CustomerSpecialProductComboService } from './customer-special-product-combo.service';

describe('CustomerSpecialProductComboController', () => {
  let controller: CustomerSpecialProductComboController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSpecialProductComboController],
      providers: [CustomerSpecialProductComboService],
    }).compile();

    controller = module.get<CustomerSpecialProductComboController>(CustomerSpecialProductComboController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
