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
  OneToOne,
} from 'typeorm';
import { OrderShippingDetailStatusConst } from '../../common/constants/order-shipping-detail.constant';
import { OrderShippings } from './order-shippings.schema';
import { OrderDetails } from '../schemas/order-details.schema';

@Entity({
  name: 'order_shipping_details',
})
export class OrderShippingDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'order_shipping',
  })
  @Index()
  order_shipping_id: number;

  @ManyToOne(() => OrderShippings, (orderShipping) => orderShipping.detail)
  @JoinColumn({
    name: 'order_shipping',
  })
  order_shipping: OrderShippings;

  @Column({
    type: 'int',
    name: 'order_detail',
  })
  @Index()
  order_detail_id: number;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.shipping) // specify inverse side as a second parameter
  @JoinColumn({
    name: 'order_detail',
  })
  order_detail: OrderDetails;

  @Column({
    type: 'tinyint',
    default: OrderShippingDetailStatusConst.NOT_RECEIVE,
  })
  @Index()
  status: OrderShippingDetailStatusConst;
}
