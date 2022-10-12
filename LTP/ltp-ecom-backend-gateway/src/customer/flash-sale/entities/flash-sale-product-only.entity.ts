import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class FlashSaleProductOnlyEntity {
  id: number;

  flash_sale_id: number;

  product_id: number;

  quantity: number;

  percentage: number;

  status: number;

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

  constructor(partial: Partial<FlashSaleProductOnlyEntity>) {
    Object.assign(this, partial);
  }
}
