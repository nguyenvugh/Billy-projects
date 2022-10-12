import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { OrderPaymentStatusConst } from '../../../common/constants/order-payment.constant';
import { OrderShippingStatusFilterConst } from '../../../common/constants/order-shipping.constant';

export class UpdateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [OrderPaymentStatusConst.PROCESSING, OrderPaymentStatusConst.PAID],
  })
  payment_status: OrderPaymentStatusConst;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [
      OrderShippingStatusFilterConst.CONFIRMED,
      OrderShippingStatusFilterConst.RECEIVING,
      OrderShippingStatusFilterConst.DELIVERING,
      OrderShippingStatusFilterConst.DELIVERED_FULL,
      OrderShippingStatusFilterConst.DELIVERED_NOT_FULL,
      OrderShippingStatusFilterConst.CANCELLED,
      OrderShippingStatusFilterConst.REFUNDED,
    ],
  })
  shipping_status: OrderShippingStatusFilterConst;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  shipping_price: number;
}
