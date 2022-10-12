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
import {
  OrderPaymentStatusConst,
  OrderPaymentTypeConst,
} from '../../common/constants/order-payment.constant';
import { TimestampOnlyCreate } from '../../common/schemas/timestamp.schema';
import { OrderPayment } from '../../order-payment/schema/order-payment.schema';

@Entity({
  name: 'order_payment_histories',
})
export class OrderPaymentHistory extends TimestampOnlyCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  log: string;

  @Column({
    type: 'int',
    name: 'order_payment',
  })
  @Index()
  orderPaymentId: number;

  @ManyToOne(() => OrderPayment, (orderPayment) => orderPayment.histories)
  @JoinColumn({
    name: 'order_payment',
  })
  order_payment: OrderPayment;
}
