import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductComboImageEntity } from './product-combo-image.entity';
import { ProductComboDetailEntity } from './product-combo-detail.entity';

export class ProductComboEntity {
  id: number;

  code: string;

  name: string;

  short_desc: string;

  description: string;

  status: number;

  total_price: number;

  avg_rating: number;

  num_sold: number;

  num_like: number;

  number_products: number;

  @Transform((value) =>
    value.value.map((el) => new ProductComboDetailEntity(el)),
  )
  details: ProductComboDetailEntity;

  @Transform((value) =>
    value.value.map((el) => new ProductComboImageEntity(el)),
  )
  images: ProductComboImageEntity[];

  @Exclude()
  @ApiHideProperty()
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

  constructor(partial: Partial<ProductComboEntity>) {
    Object.assign(this, partial);
  }
}
