import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import PaginateDto from 'src/common/dtos/paginate.dto';
import { OrderPaymentStatusConst } from '../../common/constants/order-payment.constant';
import { OrderShippingStatusFilterConst } from '../../common/constants/order-shipping.constant';
import { OrderShippingDriverConst } from '../../order-shipping/driver/base.driver';

export class FindByCriteriaDto extends PaginateDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  id: number;

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
  })
  payment_status: OrderPaymentStatusConst;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
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
