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
import { ProductDetailInOrderDto } from './product-detail-in-order.dto';
import { ProductComboDetailInOrderDto } from './product-combo-detail-in-order.dto';

export class OrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  productId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailInOrderDto)
  @ApiProperty({
    required: true,
  })
  product: ProductDetailInOrderDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  number: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  comboId?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductComboDetailInOrderDto)
  @ApiProperty({
    required: false,
  })
  product_combo?: ProductComboDetailInOrderDto;
}
