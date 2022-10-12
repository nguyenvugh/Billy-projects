import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { OrderStatusConst } from '../../common/constants/order.constant';

import { Customers } from '../../customers/schemas/customers.schema';

import { OrderDetails } from './order-details.schema';
import { OrderShippings } from './order-shippings.schema';
import { OrderPayment } from './order-payment.schema';

@Entity({
  name: 'orders',
})
export class Orders extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  code: string;

  @ManyToOne(() => Customers, (customer) => customer.orders)
  @JoinColumn([
    {
      name: 'customer',
      referencedColumnName: 'id',
    },
  ])
  @Column({
    name: 'customer',
    type: 'int',
  })
  customer: Customers;

  @Column({
    type: 'tinyint',
    name: 'status',
    default: OrderStatusConst.CONFIRMED,
  })
  status: OrderStatusConst;

  @Column({
    type: 'int',
  })
  subtotal: number;

  @Column({
    type: 'int',
  })
  tax_price: number;

  @Column({
    type: 'int',
  })
  shipping_price: number;

  @Column({
    type: 'int',
  })
  total: number;

  @Column({
    type: 'tinyint',
  })
  deleted: number;

  @Column({
    type: 'timestamp',
  })
  deleted_at: Date;

  @Column({
    type: 'int',
  })
  deleted_by: number;

  @Column({
    type: 'text',
  })
  note: string;

  @OneToMany(() => OrderDetails, (detail) => detail.order_id, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  order_details: OrderDetails[];

  @OneToMany(() => OrderShippings, (orderShipping) => orderShipping.order, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  order_shippings: OrderShippings[];

  @OneToMany(() => OrderPayment, (orderPayment) => orderPayment.order, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  payments: OrderPayment[];
}
