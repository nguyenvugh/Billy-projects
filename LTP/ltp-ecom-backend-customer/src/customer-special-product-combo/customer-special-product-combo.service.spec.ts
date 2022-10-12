import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSpecialProductComboService } from './customer-special-product-combo.service';

describe('CustomerSpecialProductComboService', () => {
  let service: CustomerSpecialProductComboService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSpecialProductComboService],
    }).compile();

    service = module.get<CustomerSpecialProductComboService>(CustomerSpecialProductComboService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
