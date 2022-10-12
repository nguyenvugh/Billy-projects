import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class OrderShippingInventoryWithProductEntity {
  name: string;

  address: string;

  phone_number: string;

  price: number;

  shipping_price: number;

  products: number[];

  @Exclude()
  @ApiHideProperty()
  cityId: number;

  @Exclude()
  @ApiHideProperty()
  districtId: number;

  @Exclude()
  @ApiHideProperty()
  wardId: number;

  constructor(partial: Partial<OrderShippingInventoryWithProductEntity>) {
    Object.assign(this, partial);
  }
}
