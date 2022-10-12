import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { MediaUploadEntity } from '../../media-upload/entities/media-upload.entity';
import { ProductOnlyEntity } from '../../product/entities/product-only.entity';

export class PromotionEntity {
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

  @Transform((value) => new MediaUploadEntity(value.value))
  thumbnail_obj: MediaUploadEntity;

  @Transform((value) => new ProductOnlyEntity(value.value))
  product_obj: ProductOnlyEntity;

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

  constructor(partial: Partial<PromotionEntity>) {
    Object.assign(this, partial);
  }
}
