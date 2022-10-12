import { Controller } from '@nestjs/common';
import { ProductTranslateService } from './product-translate.service';

@Controller('product-translate')
export class ProductTranslateController {
  constructor(private readonly productTranslateService: ProductTranslateService) {}
}
