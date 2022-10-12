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
import { Order } from '../../order/schema/order.schema';

@Entity({
  name: 'order_histories',
})
export class OrderHistory extends TimestampOnlyCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  log: string;

  @Column({
    type: 'int',
    name: 'order_id',
  })
  @Index()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.histories)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
