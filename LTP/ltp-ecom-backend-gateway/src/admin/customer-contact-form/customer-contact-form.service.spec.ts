import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactFormService } from './customer-contact-form.service';

describe('CustomerContactFormService', () => {
  let service: CustomerContactFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerContactFormService],
    }).compile();

    service = module.get<CustomerContactFormService>(CustomerContactFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
