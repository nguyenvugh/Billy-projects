import { Transform } from 'class-transformer';
import { OrderShippingInventoryWithProductEntity } from './order-shipping-inventory-with-product.entity';

export class OrderShippingTypeEntity {
  id: number;

  name: string;

  description: string;

  price: number;

  disabled: boolean;

  @Transform((value) =>
    value.value.map((el) => new OrderShippingInventoryWithProductEntity(el)),
  )
  detail: OrderShippingInventoryWithProductEntity[];

  constructor(partial: Partial<OrderShippingTypeEntity>) {
    Object.assign(this, partial);
  }
}
