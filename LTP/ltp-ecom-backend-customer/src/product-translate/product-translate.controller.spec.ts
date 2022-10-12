import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslateController } from './product-translate.controller';
import { ProductTranslateService } from './product-translate.service';

describe('ProductTranslateController', () => {
  let controller: ProductTranslateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTranslateController],
      providers: [ProductTranslateService],
    }).compile();

    controller = module.get<ProductTranslateController>(ProductTranslateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
