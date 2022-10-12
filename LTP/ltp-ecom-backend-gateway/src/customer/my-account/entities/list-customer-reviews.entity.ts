import { Transform } from 'class-transformer';
import { CustomerReviewEntity } from './customer-review.entity';

export class ListCustomerReviewsEntity {
  @Transform((value) => value.value.map((el) => new CustomerReviewEntity(el)))
  results: CustomerReviewEntity[];

  total: number;

  max_page: number;

  constructor(partial: Partial<ListCustomerReviewsEntity>) {
    Object.assign(this, partial);
  }
}
