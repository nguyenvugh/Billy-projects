import { Transform } from 'class-transformer';
import { OrderShippingTypeEntity } from './order-shipping-type.entity';

export class ListOrderShippingTypesEntity {
  @Transform((value) =>
    value.value.map((el) => new OrderShippingTypeEntity(el)),
  )
  results: OrderShippingTypeEntity[];

  constructor(partial: Partial<ListOrderShippingTypesEntity>) {
    Object.assign(this, partial);
  }
}
