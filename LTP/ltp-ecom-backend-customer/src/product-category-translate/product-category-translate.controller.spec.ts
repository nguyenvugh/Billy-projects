import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryTranslateController } from './product-category-translate.controller';
import { ProductCategoryTranslateService } from './product-category-translate.service';

describe('ProductCategoryTranslateController', () => {
  let controller: ProductCategoryTranslateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryTranslateController],
      providers: [ProductCategoryTranslateService],
    }).compile();

    controller = module.get<ProductCategoryTranslateController>(ProductCategoryTranslateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
