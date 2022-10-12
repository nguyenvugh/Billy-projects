import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumberString,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerReviewRating } from '../../common/constants/customer-review.constant';

export class CreateOneCustomerReview {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  customer_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  product_id: number;

  @IsNotEmpty()
  @IsEnum(CustomerReviewRating)
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  rating: CustomerReviewRating;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  content: string;
}
