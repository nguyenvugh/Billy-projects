import { Transform } from 'class-transformer';
import { ProductComboEntity } from './product-combo.entity';

export class ListProductCombosEntity {
  @Transform((value) => value.value.map((el) => new ProductComboEntity(el)))
  results: ProductComboEntity[];

  total: number;

  max_page: number;

  constructor(partial: Partial<ListProductCombosEntity>) {
    Object.assign(this, partial);
  }
}
