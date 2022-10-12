import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, MaxLength } from 'class-validator';
import {
  CustomerReviewRating,
  ProductReviewStatus,
} from '../../../common/constants/product.constant';

export class CreateProductReviewDto {
  @ApiProperty({ required: true })
  @MaxLength(255)
  content: string;

  @ApiProperty({
    required: true,
    enum: [
      CustomerReviewRating.FIVE_STARS,
      CustomerReviewRating.FOUR_STARS,
      CustomerReviewRating.THREE_STARS,
      CustomerReviewRating.TWO_STARS,
      CustomerReviewRating.ONE_STAR,
    ],
  })
  @IsEnum(CustomerReviewRating)
  rating: CustomerReviewRating;

  @ApiProperty({ required: true })
  productId: number;
}
