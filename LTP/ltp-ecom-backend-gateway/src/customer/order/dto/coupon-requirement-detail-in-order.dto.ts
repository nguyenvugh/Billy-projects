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

export class CouponRequirementDetailInOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  type?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  value?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  product?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  percentage?: number;
}
