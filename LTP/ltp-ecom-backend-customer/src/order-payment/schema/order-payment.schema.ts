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
import { TimestampWithoutSoftDelete } from '../../common/schemas/timestamp.schema';
import { Order } from '../../order/schema/order.schema';
import { OrderPaymentHistory } from '../../order-payment-history/schema/order-payment-history.schema';

@Entity({
  name: 'order_payments',
})
export class OrderPayment extends TimestampWithoutSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    default: OrderPaymentStatusConst.PROCESSING,
  })
  @Index()
  status: OrderPaymentStatusConst;

  @Column({
    type: 'tinyint',
    default: OrderPaymentTypeConst.COD,
  })
  @Index()
  type: OrderPaymentTypeConst;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  sub_type: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Index()
  online_payment_method: string;

  @Column({
    type: 'int',
    nullable: true,
    unsigned: true,
  })
  online_payment_tax: number;

  @Column({
    type: 'int',
    name: 'order_id',
  })
  @Index()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @OneToMany(
    () => OrderPaymentHistory,
    (orderPaymentHistory) => orderPaymentHistory.order_payment,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  histories: OrderPaymentHistory[];
}
