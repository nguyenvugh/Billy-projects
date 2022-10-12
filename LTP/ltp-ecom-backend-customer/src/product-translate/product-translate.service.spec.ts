import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslateService } from './product-translate.service';

describe('ProductTranslateService', () => {
  let service: ProductTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTranslateService],
    }).compile();

    service = module.get<ProductTranslateService>(ProductTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
