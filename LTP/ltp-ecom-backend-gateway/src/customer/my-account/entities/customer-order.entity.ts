import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CustomerOrderDetailEntity } from './customer-order-detail.entity';
import { CustomerOrderPaymentEntity } from './customer-order-payment.entity';
import { CustomerOrderShippingEntity } from './customer-order-shipping.entity';

export class CustomerOrderEntity {
  @Transform((value) =>
    value.value.map((el) => new CustomerOrderDetailEntity(el)),
  )
  detail: CustomerOrderDetailEntity[];

  @Transform((value) => new CustomerOrderShippingEntity(value.value))
  shipping: CustomerOrderShippingEntity;

  @Transform((value) => new CustomerOrderPaymentEntity(value.value))
  payment: CustomerOrderPaymentEntity;

  @Exclude()
  @ApiHideProperty()
  status: number;

  @Exclude()
  @ApiHideProperty()
  customerId: number;

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

  constructor(partial: Partial<CustomerOrderEntity>) {
    Object.assign(this, partial);
  }
}
