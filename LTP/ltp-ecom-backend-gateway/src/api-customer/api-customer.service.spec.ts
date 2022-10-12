import { Test, TestingModule } from '@nestjs/testing';
import { ApiCustomerService } from './api-customer.service';

describe('ApiCustomerService', () => {
  let service: ApiCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiCustomerService],
    }).compile();

    service = module.get<ApiCustomerService>(ApiCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
