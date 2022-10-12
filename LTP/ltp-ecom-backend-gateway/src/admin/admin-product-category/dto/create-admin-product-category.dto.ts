import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';
import { BooleanValue } from 'src/common/constants/product.constant';

export class CreateProductCategoryTransDto {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  language_field: string;

  @ApiProperty()
  language_value: string;
}

export class CreateAdminProductCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  image: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parent?: number;

  @ApiProperty({ type: [CreateProductCategoryTransDto] })
  translates: CreateProductCategoryTransDto[];

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @IsEnum(BooleanValue)
  is_feature?: number = BooleanValue.FALSE;
}
