import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ProductPromotionOnlyEntity {
  id: number;

  type: number;

  link: string;

  percentage: number;

  is_active: number;

  start_date: string;

  start_time: string;

  end_date: string;

  end_time: string;

  buy_button: string;

  @Exclude()
  @ApiHideProperty()
  thumbnail: number;

  @Exclude()
  @ApiHideProperty()
  product: number;

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

  constructor(partial: Partial<ProductPromotionOnlyEntity>) {
    Object.assign(this, partial);
  }
}
