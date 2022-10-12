import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactFormController } from './customer-contact-form.controller';
import { CustomerContactFormService } from './customer-contact-form.service';

describe('CustomerContactFormController', () => {
  let controller: CustomerContactFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerContactFormController],
      providers: [CustomerContactFormService],
    }).compile();

    controller = module.get<CustomerContactFormController>(CustomerContactFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
