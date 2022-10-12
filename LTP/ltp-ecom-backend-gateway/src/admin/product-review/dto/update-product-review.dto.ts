import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ProductReviewStatus } from '../../../common/constants/product.constant';

export class UpdateProductReviewDto {
  @ApiProperty({ required: true, type: [Number] })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids: number[];

  @ApiProperty({
    required: true,
    enum: [
      ProductReviewStatus.PENDING,
      ProductReviewStatus.APPROVED,
      ProductReviewStatus.REJECTED,
    ],
    description: 'Pending is 1, Approve is 2, Decline is 3',
  })
  @Type(() => Number)
  status: number;
}
