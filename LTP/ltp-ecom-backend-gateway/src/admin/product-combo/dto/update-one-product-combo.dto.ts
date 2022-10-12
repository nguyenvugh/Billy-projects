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
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanValue } from '../../../common/constants/global.constant';
import { ProductComboTranslateDto } from './product-combo-translate.dto';
import { ProductComboImageDto } from './product-combo-image.dto';
import { ProductComboDetailDto } from './product-combo-detail.dto';

export class UpdateOneProductComboDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  code: string;

  @IsNotEmpty()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  status: BooleanValue;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductComboTranslateDto)
  @ApiProperty({
    required: true,
    type: [ProductComboTranslateDto],
  })
  translates: ProductComboTranslateDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductComboImageDto)
  @ApiProperty({
    required: false,
    type: [ProductComboImageDto],
  })
  images: ProductComboImageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductComboDetailDto)
  @ApiProperty({
    required: false,
    type: [ProductComboDetailDto],
  })
  details: ProductComboDetailDto[];
}
