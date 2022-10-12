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
import { OrderStatusConst } from '../../common/constants/order.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Customer } from '../../customer/schema/customer.schema';
import { OrderDetail } from '../../order-detail/schema/order-detail.schema';
import { OrderHistory } from '../../order-history/schema/order-history.schema';
import { OrderShipping } from '../../order-shipping/schema/order-shipping.schema';
import { OrderPayment } from '../../order-payment/schema/order-payment.schema';
import { Coupon } from '../../coupon/schemas/coupon.schema';

@Entity({
  name: 'orders',
})
export class Order extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index({
    unique: true,
  })
  code: string;

  @Column({
    type: 'tinyint',
    default: OrderStatusConst.CONFIRMED,
  })
  @Index()
  status: OrderStatusConst;

  @Column({
    type: 'int',
    unsigned: true,
  })
  subtotal: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
  })
  tax_price: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
  })
  shipping_price: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  coupon_price: number;

  @Column({
    type: 'int',
    name: 'coupon',
    nullable: true,
  })
  @Index()
  coupon_id: number;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders)
  @JoinColumn({
    name: 'coupon',
  })
  coupon: Coupon;

  @Column({
    type: 'int',
    unsigned: true,
  })
  total: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  note: string;

  @Column({
    type: 'int',
    name: 'customer',
  })
  @Index()
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  detail: OrderDetail[];

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  histories: OrderHistory[];

  @OneToMany(() => OrderShipping, (orderShipping) => orderShipping.order, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  shippings: OrderShipping[];

  @OneToMany(() => OrderPayment, (orderPayment) => orderPayment.order, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  payments: OrderPayment[];
}
