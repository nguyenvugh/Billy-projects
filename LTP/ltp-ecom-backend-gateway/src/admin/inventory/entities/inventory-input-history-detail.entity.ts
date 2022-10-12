import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

export class InventoryInputHistoryDetailEntity {
  id: number;

  number: number;

  @Transform((value) => new ProductEntity(value.value))
  product: ProductEntity;

  @Exclude()
  @ApiHideProperty()
  product_id: number;

  @Exclude()
  @ApiHideProperty()
  input_history_id: number;

  @Exclude()
  @ApiHideProperty()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  constructor(partial: Partial<InventoryInputHistoryDetailEntity>) {
    Object.assign(this, partial);
  }
}
