import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

export class InventoryProductEntity {
  id: number;

  remaining_number: number;

  sold_number: number;

  @Transform((value) => new ProductEntity(value.value))
  product: ProductEntity;

  @Exclude()
  @ApiHideProperty()
  product_id: number;

  @Exclude()
  @ApiHideProperty()
  inventory_id: number;

  constructor(partial: Partial<InventoryProductEntity>) {
    Object.assign(this, partial);
  }
}
