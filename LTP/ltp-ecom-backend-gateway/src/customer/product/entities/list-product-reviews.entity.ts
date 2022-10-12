import { Transform } from 'class-transformer';
import { ProductReviewEntity } from './product-review.entity';

export class ListProductReviewsEntity {
  @Transform((value) => value.value.map((el) => new ProductReviewEntity(el)))
  results: ProductReviewEntity[];

  total: number;

  max_page: number;

  constructor(partial: Partial<ListProductReviewsEntity>) {
    Object.assign(this, partial);
  }
}
