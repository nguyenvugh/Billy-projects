import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductOnlyEntity } from '../../product/entities/product-only.entity';

export class ProductComboDetailEntity {
  id: number;

  quantity: number;

  percentage: number;

  @Transform((value) => new ProductOnlyEntity(value.value))
  product: ProductOnlyEntity;

  @Exclude()
  @ApiHideProperty()
  product_combo_id: number;

  @Exclude()
  @ApiHideProperty()
  product_id: number;

  @Exclude()
  @ApiHideProperty()
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

  constructor(partial: Partial<ProductComboDetailEntity>) {
    Object.assign(this, partial);
  }
}
