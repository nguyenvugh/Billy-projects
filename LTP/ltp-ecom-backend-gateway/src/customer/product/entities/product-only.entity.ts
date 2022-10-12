import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ProductOnlyEntity {
  id: number;

  code: string;

  name: string;

  is_feature: number;

  status: number;

  status_display: number;

  price: number;

  avg_rating: number;

  categoryId: number;

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

  constructor(partial: Partial<ProductOnlyEntity>) {
    Object.assign(this, partial);
  }
}
