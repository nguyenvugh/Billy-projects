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

export class CustomerCreateCustomerAddressDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    maxLength: 255,
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: false,
    maxLength: 255,
  })
  alias: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    maxLength: 255,
  })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    maxLength: 255,
  })
  address: string;

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
