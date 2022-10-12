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
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderShippingOnlyAddressDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  countryId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  cityId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  districtId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  wardId: number;
}
