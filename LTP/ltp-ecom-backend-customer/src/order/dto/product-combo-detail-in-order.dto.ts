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
import { ProductComboProductDetailInOrderDto } from './product-combo-product-detail-in-order.dto';

export class ProductComboDetailInOrderDto {
  @IsNotEmpty()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  status: BooleanValue;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  number_products: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  total_price: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductComboProductDetailInOrderDto)
  @ApiProperty({
    required: true,
    type: ProductComboProductDetailInOrderDto,
  })
  detail: ProductComboProductDetailInOrderDto;
}
