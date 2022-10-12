import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { BooleanValue, ProductStatusConst } from 'src/common/constants';
import { ProductAttribute } from '../schemas/product-attribute.schema';

export class CreateProductAttributeTransDto {
  language_code: string;
  language_field: string;
  language_value: string;
  product_attribute?: ProductAttribute;
}
export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsEnum(BooleanValue)
  // is_popular?: number = BooleanValue.FALSE;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BooleanValue)
  is_feature?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BooleanValue)
  status_display?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ProductStatusConst)
  status?: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNumber()
  category: number;

  @ApiProperty()
  @IsNumber({}, { each: true })
  // @ArrayMinSize(1)
  @IsOptional()
  images: number[];

  @ApiProperty()
  @IsNumber()
  thumbnail: number;

  @IsNotEmpty()
  @ApiProperty()
  length: number;

  @IsNotEmpty()
  @ApiProperty()
  width: number;

  @IsNotEmpty()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    required: true,
    type: Number,
    enum: [BooleanValue.FALSE, BooleanValue.TRUE],
  })
  allow_cod: number;

  // 3 translate field: name, short_desc, desc
  // include stock in database.

  @ApiProperty()
  @ArrayMinSize(1)
  translates: CreateProductAttributeTransDto[];

  // @ApiProperty()
  // @ArrayMinSize(1)
  // short_desc: CreateProductAttributeTransDto[];

  // @ApiProperty()
  // @ArrayMinSize(1)
  // desc: CreateProductAttributeTransDto[];
}
