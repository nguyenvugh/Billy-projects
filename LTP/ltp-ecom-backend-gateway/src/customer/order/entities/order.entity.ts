import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class OrderEntity {
  id: number;

  code: string;

  status: number;

  subtotal: number;

  tax_price: number;

  shipping_price: number;

  total: number;

  note: string;

  @Exclude()
  @ApiHideProperty()
  customerId: number;

  @Exclude()
  @ApiHideProperty()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted: number;

  @Exclude()
  @ApiHideProperty()
  deleted_by: number;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
