import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  CouponRequirementTypeConst,
  CouponStatusConst,
  CouponTypeConst,
} from 'src/common/constants/coupon.constant';

export class CouponOrderRequirementItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  price: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  value: number;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [
      CouponRequirementTypeConst.PRICE,
      CouponRequirementTypeConst.PERCENTAGE,
    ],
  })
  type: number;
}

export class CouponProductRequirementItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  product: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  percentage: number;
}

export class CouponTranslateItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_field: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_value: string;
}

export class CreateCouponDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  limit: number;

  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  start_date: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ required: true })
  start_time: string;

  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  end_date: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ required: true })
  end_time: string;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [CouponTypeConst.ORDER, CouponTypeConst.PRODUCT_QUANTITY],
  })
  type: number;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [CouponStatusConst.ACTIVATED, CouponStatusConst.INACTIVATED],
  })
  status: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ required: true, type: [CouponTranslateItemDto] })
  @Type(() => CouponTranslateItemDto)
  contents: CouponTranslateItemDto[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false, type: [CouponOrderRequirementItemDto] })
  @Type(() => CouponOrderRequirementItemDto)
  order_requirements: CouponOrderRequirementItemDto[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false, type: [CouponProductRequirementItemDto] })
  @Type(() => CouponProductRequirementItemDto)
  product_requirements: CouponProductRequirementItemDto[];
}
