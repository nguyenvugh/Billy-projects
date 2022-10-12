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

export class ProductComboTranslateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 2,
  })
  language_code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    maxLength: 255,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    required: true,
    maxLength: 100,
  })
  short_desc: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  description: string;
}
