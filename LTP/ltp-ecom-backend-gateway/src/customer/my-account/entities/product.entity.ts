import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductImageEntity } from '../../product/entities/product-image.entity';

export class ProductEntity {
  id: number;

  code: string;

  name: string;

  is_feature: number;

  status: number;

  status_display: number;

  price: number;

  avg_rating: number;

  @Transform((value) => value.value.map((el) => new ProductImageEntity(el)))
  images: ProductImageEntity[];

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

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
