import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductComboDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  percentage: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  quantity: number;
}
