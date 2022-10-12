import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

export class CustomerSpecialProductEntity {
  id: number;

  type: number;

  @Transform((value) => new ProductEntity(value.value))
  product: ProductEntity;

  @Exclude()
  @ApiHideProperty()
  customer_id: number;

  @Exclude()
  @ApiHideProperty()
  product_id: number;

  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted: number;

  @Exclude()
  @ApiHideProperty()
  deleted_by: number;

  constructor(partial: Partial<CustomerSpecialProductEntity>) {
    Object.assign(this, partial);
  }
}
