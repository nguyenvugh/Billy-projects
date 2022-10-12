import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TimestampOnlyCreate } from '../../common/schemas/timestamp.schema';
import { OrderShipping } from './order-shipping.schema';

@Entity({
  name: 'order_shipping_histories',
})
export class OrderShippingHistory extends TimestampOnlyCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  log: string;

  @Column({
    type: 'int',
    name: 'order_shipping',
  })
  @Index()
  order_shipping_id: number;

  @ManyToOne(() => OrderShipping, (orderShipping) => orderShipping.histories)
  @JoinColumn({
    name: 'order_shipping',
  })
  order_shipping: OrderShipping;
}
