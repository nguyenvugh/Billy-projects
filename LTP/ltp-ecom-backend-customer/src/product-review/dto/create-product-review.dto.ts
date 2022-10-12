import { CustomerReviewRating } from '../../common/constants/customer-review.constant';

export class CreateProductReviewDto {
  customerId: number;
  content: string;
  rating: CustomerReviewRating;
  productId: number;
}
