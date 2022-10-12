import { Expose } from 'class-transformer';

export class UpdateProductReviewDto {
  ids: number[];
  status: number;
}
