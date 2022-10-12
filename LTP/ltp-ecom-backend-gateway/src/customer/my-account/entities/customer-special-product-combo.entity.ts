import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductComboEntity } from '../../product-combo/entities/product-combo.entity';

export class CustomerSpecialProductComboEntity {
  id: number;

  type: number;

  @Transform((value) => new ProductComboEntity(value.value))
  product_combo: ProductComboEntity;

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

  constructor(partial: Partial<CustomerSpecialProductComboEntity>) {
    Object.assign(this, partial);
  }
}
