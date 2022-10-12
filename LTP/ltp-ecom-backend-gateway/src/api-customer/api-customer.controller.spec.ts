import { Test, TestingModule } from '@nestjs/testing';
import { ApiCustomerController } from './api-customer.controller';
import { ApiCustomerService } from './api-customer.service';

describe('ApiCustomerController', () => {
  let controller: ApiCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiCustomerController],
      providers: [ApiCustomerService],
    }).compile();

    controller = module.get<ApiCustomerController>(ApiCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
