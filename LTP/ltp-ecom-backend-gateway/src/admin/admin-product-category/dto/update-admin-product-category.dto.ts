import { PartialType } from '@nestjs/swagger';
import { CreateAdminProductCategoryDto } from './create-admin-product-category.dto';

export class UpdateAdminProductCategoryDto extends PartialType(
  CreateAdminProductCategoryDto,
) {}
