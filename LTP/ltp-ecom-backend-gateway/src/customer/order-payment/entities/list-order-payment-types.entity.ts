import { Transform } from 'class-transformer';
import { OrderPaymentTypeEntity } from './order-payment-type.entity';

export class ListOrderPaymentTypesEntity {
  @Transform((value) => value.value.map((el) => new OrderPaymentTypeEntity(el)))
  results: OrderPaymentTypeEntity[];

  constructor(partial: Partial<ListOrderPaymentTypesEntity>) {
    Object.assign(this, partial);
  }
}
