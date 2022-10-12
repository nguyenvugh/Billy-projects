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
import { OrderShippingDto } from './order-shipping.dto';
import { OrderPaymentDto } from './order-payment.dto';
import { OrderProductDto } from './order-product.dto';
import { CouponDetailInOrderDto } from './coupon-detail-in-order.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  customerId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  coupon_code: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CouponDetailInOrderDto)
  @ApiProperty({
    required: false,
  })
  coupon: CouponDetailInOrderDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderPaymentDto)
  @ApiProperty({
    required: true,
  })
  payment: OrderPaymentDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderShippingDto)
  @ApiProperty({
    required: true,
  })
  shipping: OrderShippingDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({
    required: true,
  })
  products: OrderProductDto[];
}
