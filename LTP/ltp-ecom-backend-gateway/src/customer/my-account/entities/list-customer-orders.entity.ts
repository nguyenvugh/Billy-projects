import { Transform } from 'class-transformer';
import { CustomerOrderEntity } from './customer-order.entity';

export class ListCustomerOrdersEntity {
  @Transform((value) => value.value.map((el) => new CustomerOrderEntity(el)))
  results: CustomerOrderEntity[];

  constructor(partial: Partial<ListCustomerOrdersEntity>) {
    Object.assign(this, partial);
  }
}
