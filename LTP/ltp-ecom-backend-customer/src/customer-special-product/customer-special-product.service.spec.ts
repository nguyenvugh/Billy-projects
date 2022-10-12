import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSpecialProductService } from './customer-special-product.service';

describe('CustomerSpecialProductService', () => {
  let service: CustomerSpecialProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSpecialProductService],
    }).compile();

    service = module.get<CustomerSpecialProductService>(CustomerSpecialProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
