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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BooleanValue } from '../../common/constants/global.constant';
import { ProductStatusDisplayConst } from '../../common/constants/product.constant';
import { ProductDimensionDto } from '../../product/dto/product-dimension.dto';
import { FlashSaleDetailInOrderDto } from './flash-sale-detail-in-order.dto';
import { PromotionDetailInOrderDto } from './promotion-detail-in-order.dto';

export class ProductDetailInOrderDto {
  @IsNotEmpty()
  @IsEnum(ProductStatusDisplayConst)
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  status: ProductStatusDisplayConst;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDimensionDto)
  @ApiProperty({
    required: true,
  })
  dimension: ProductDimensionDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  weight: number;

  @IsNotEmpty()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  allow_cod: BooleanValue;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  price: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FlashSaleDetailInOrderDto)
  @ApiProperty({
    required: true,
  })
  flash_sale: FlashSaleDetailInOrderDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PromotionDetailInOrderDto)
  @ApiProperty({
    required: true,
  })
  promotion: PromotionDetailInOrderDto;
}
