import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateProductCategoryDto } from './create-product-category.dto';

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {
  @IsNotEmpty()
  id: number;
}
