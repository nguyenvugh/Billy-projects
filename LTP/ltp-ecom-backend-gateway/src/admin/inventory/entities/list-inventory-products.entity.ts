import { Transform } from 'class-transformer';
import { InventoryProductEntity } from './inventory-product.entity';

export class ListInventoryProductsOnlyEntity {
  @Transform((value) => value.value.map((el) => new InventoryProductEntity(el)))
  results: InventoryProductEntity[];

  constructor(partial: Partial<ListInventoryProductsOnlyEntity>) {
    Object.assign(this, partial);
  }
}
