import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatusConst } from 'src/common/constants/order.constant';
import { OrderPaymentStatusConst } from '../../../common/constants/order-payment.constant';
import {
  OrderShippingStatusFilterConst,
  OrderShippingDriverConst,
} from '../../../common/constants/order-shipping.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindByCriteriaDto extends PaginateDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  search_value: string;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [OrderPaymentStatusConst.PROCESSING, OrderPaymentStatusConst.PAID],
  })
  payment_status: OrderPaymentStatusConst;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
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

  @IsOptional()
  @Type(() => Number)
  @IsEnum(OrderShippingDriverConst)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [OrderShippingDriverConst.GHTK, OrderShippingDriverConst.LTP],
  })
  shipping_driver: OrderShippingDriverConst;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  order_date_from: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  order_date_to: string;
}
