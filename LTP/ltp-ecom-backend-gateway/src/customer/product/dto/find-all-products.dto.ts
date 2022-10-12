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
  MaxLength,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BooleanValue } from '../../../common/constants/global.constant';
import {
  ProductPopularConst,
  ProductFavouriteConst,
  ProductFlashSaleConst,
  ProductCharityConst,
} from '../../../common/constants/product.constant';
import { SortValueConst } from '../../../common/constants/sorting.constant';
import PaginateDto from '../../../common/dtos/paginate.dto';

export class CustomerFindAllProductsDto extends PaginateDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: false,
    maxLength: 255,
  })
  search: string;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: [Number],
  })
  category: [number];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [ProductPopularConst.NOT_POPULAR, ProductPopularConst.POPULAR],
  })
  is_feature: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [
      ProductFavouriteConst.NOT_FAVOURITE,
      ProductFavouriteConst.FAVOURITE,
    ],
  })
  is_favourite: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [
      ProductFlashSaleConst.NOT_FLASH_SALE,
      ProductFlashSaleConst.FLASH_SALE,
    ],
  })
  is_flash_sale: number;

  @IsOptional()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [BooleanValue.FALSE, BooleanValue.TRUE],
  })
  is_promotion: number;

  @IsOptional()
  @IsEnum(ProductCharityConst)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [ProductCharityConst.NOT_CHARITY, ProductCharityConst.CHARITY],
  })
  is_charity: number;

  @IsOptional()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [BooleanValue.FALSE, BooleanValue.TRUE],
  })
  is_homepage_feature_products: number;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: [Number],
  })
  city: [number];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
  })
  price_from: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
  })
  price_to: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: true,
    enum: [SortValueConst.ASC, SortValueConst.DESC],
    default: SortValueConst.ASC,
  })
  sort_value: string;
}
