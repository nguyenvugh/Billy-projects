import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryTranslateService } from './product-category-translate.service';

describe('ProductCategoryTranslateService', () => {
  let service: ProductCategoryTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCategoryTranslateService],
    }).compile();

    service = module.get<ProductCategoryTranslateService>(ProductCategoryTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
