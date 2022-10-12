import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductImageEntity } from './product-image.entity';
import { ProductReviewCustomerEntity } from './product-review-customer.entity';

export class ProductReviewEntity {
  id: number;

  @Transform((value) => new ProductReviewCustomerEntity(value.value))
  customer: ProductReviewCustomerEntity;

  @Transform((value) => new ProductImageEntity(value.value))
  image: ProductImageEntity;

  status: number;

  rating: number;

  content: string;

  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  customerId: number;

  @Exclude()
  @ApiHideProperty()
  imageId: number;

  @Exclude()
  @ApiHideProperty()
  productId: number;

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

  constructor(partial: Partial<ProductReviewEntity>) {
    Object.assign(this, partial);
  }
}
