import { Transform } from 'class-transformer';
import { ProductCategoryEntity } from './product-category.entity';

export class ListProductCategoriesEntity {
  @Transform((value) => value.value.map((el) => new ProductCategoryEntity(el)))
  results: ProductCategoryEntity[];

  constructor(partial: Partial<ListProductCategoriesEntity>) {
    Object.assign(this, partial);
  }
}
