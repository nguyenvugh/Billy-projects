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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderProductDto } from '../../order/dto/order-product.dto';
import { OrderShippingDriverConst } from '../../order-shipping/driver/base.driver';

export class FindAllTypesDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  driver: OrderShippingDriverConst;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({
    required: true,
    type: [OrderProductDto],
  })
  products: OrderProductDto[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  customerId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  coupon_code: string;
}
