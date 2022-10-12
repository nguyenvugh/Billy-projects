import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ProductReviewStatus } from '../../../common/constants/product.constant';
import PaginateDto from '../../../common/dtos/paginate.dto';

export class FindProductReviewDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q: string;

  @ApiProperty({
    required: false,
    enum: [
      ProductReviewStatus.PENDING,
      ProductReviewStatus.APPROVED,
      ProductReviewStatus.REJECTED,
    ],
    description: 'Pending is 1, Approve is 2, Decline is 3',
  })
  @IsOptional()
  @Type(() => Number)
  status: ProductReviewStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  product_id: number;
}
