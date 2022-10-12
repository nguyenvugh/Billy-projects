import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { FlashSaleProductEntity } from './flash-sale-product.entity';

export class FlashSaleEntity {
  id: number;

  name: string;

  start_date: string;

  end_date: string;

  status: number;

  @Transform((value) => value.value.map((el) => new FlashSaleProductEntity(el)))
  products: FlashSaleProductEntity[];

  @Exclude()
  @ApiHideProperty()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  created_by: number;

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

  constructor(partial: Partial<FlashSaleEntity>) {
    Object.assign(this, partial);
  }
}
