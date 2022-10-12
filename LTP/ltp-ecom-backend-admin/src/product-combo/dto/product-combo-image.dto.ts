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
import { BooleanValue } from '../../common/constants';

export class ProductComboImageDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  image_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  is_thumbnail: BooleanValue;
}
