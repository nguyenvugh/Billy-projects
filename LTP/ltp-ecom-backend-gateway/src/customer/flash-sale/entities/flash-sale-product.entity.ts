import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductOnlyEntity } from './product-only.entity';

export class FlashSaleProductEntity {
  id: number;

  flash_sale_id: number;

  product_id: number;

  quantity: number;

  percentage: number;

  status: number;

  @Transform((value) => new ProductOnlyEntity(value.value))
  product: ProductOnlyEntity;

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

  constructor(partial: Partial<FlashSaleProductEntity>) {
    Object.assign(this, partial);
  }
}
