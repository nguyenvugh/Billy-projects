import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CouponRequirementDetailInOrderDto } from './coupon-requirement-detail-in-order.dto';

export class CouponDetailInOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  type: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CouponRequirementDetailInOrderDto)
  @ApiProperty({
    required: true,
    type: [CouponRequirementDetailInOrderDto],
  })
  requirements: CouponRequirementDetailInOrderDto[];
}
