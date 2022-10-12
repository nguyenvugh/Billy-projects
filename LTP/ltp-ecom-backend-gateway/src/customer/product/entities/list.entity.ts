import { Transform } from 'class-transformer';
import { ProductEntity } from './product.entity';

export class ListProductsEntity {
  @Transform((value) => value.value.map((el) => new ProductEntity(el)))
  results: ProductEntity[];

  total: number;

  max_page: number;

  constructor(partial: Partial<ListProductsEntity>) {
    Object.assign(this, partial);
  }
}
