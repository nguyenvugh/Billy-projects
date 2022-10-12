import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

export class CustomerReviewEntity {
  id: number;

  image_id: number;

  status: number;

  rating: number;

  content: string;

  @Transform((value) => new ProductEntity(value.value))
  product: ProductEntity;

  @Exclude()
  @ApiHideProperty()
  customerId: number;

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

  constructor(partial: Partial<CustomerReviewEntity>) {
    Object.assign(this, partial);
  }
}
