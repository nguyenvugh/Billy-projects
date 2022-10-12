import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ProductReviewStatus } from '../../../common/constants/product.constant';

export class DeleteProductReviewDto {
  @ApiProperty({ required: true, type: [Number] })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids: number[];
}
