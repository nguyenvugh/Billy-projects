import { Controller } from '@nestjs/common';
import { ProductCategoryTranslateService } from './product-category-translate.service';

@Controller('product-category-translate')
export class ProductCategoryTranslateController {
  constructor(private readonly productCategoryTranslateService: ProductCategoryTranslateService) {}
}
