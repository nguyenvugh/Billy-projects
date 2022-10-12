import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import {
  BooleanValue,
  ProductStatusConst,
} from 'src/common/constants/product.constant';

export class CreateProductAttributeTransDto {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  language_field: string;

  @ApiProperty()
  language_value: string;
  // product_attribute?: ProductAttribute;
}
export class CreateAdminProductDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: -1 })
  @IsOptional()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  is_popular?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BooleanValue)
  is_feature?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BooleanValue)
  status_display?: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsEnum(ProductStatusConst)
  @Type(() => Number)
  status?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @ApiProperty()
  @IsNumber()
  thumbnail: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  category: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  length: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @IsNumber()
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

  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsOptional()
  images: number[];

  // 3 translate field: name, short_desc, desc
  // include stock in database.

  @ApiProperty({ type: [CreateProductAttributeTransDto] })
  @ArrayMinSize(1)
  translates: CreateProductAttributeTransDto[];

  // @ApiProperty({ type: [CreateProductAttributeTransDto] })
  // @ArrayMinSize(1)
  // short_desc: CreateProductAttributeTransDto[];

  // @ApiProperty({ type: [CreateProductAttributeTransDto] })
  // @ArrayMinSize(1)
  // desc: CreateProductAttributeTransDto[];
}
