import { Test, TestingModule } from '@nestjs/testing';
import { ProductComboController } from './product-combo.controller';
import { ProductComboService } from './product-combo.service';

describe('ProductComboController', () => {
  let controller: ProductComboController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductComboController],
      providers: [ProductComboService],
    }).compile();

    controller = module.get<ProductComboController>(ProductComboController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
