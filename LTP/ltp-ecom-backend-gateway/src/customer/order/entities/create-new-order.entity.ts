import { Exclude, Transform } from 'class-transformer';
import { OrderEntity } from './order.entity';

export class CreateNewOrderEntity {
  status: number;

  @Transform((value) => new OrderEntity(value.value))
  order: OrderEntity;

  constructor(partial: Partial<CreateNewOrderEntity>) {
    Object.assign(this, partial);
  }
}
