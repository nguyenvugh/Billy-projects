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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderProductDto } from '../../order/dto/order-product.dto';

export class FindAllTypesDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({
    required: true,
  })
  products: OrderProductDto[];

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
