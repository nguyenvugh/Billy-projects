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
  BaseEntity,
} from 'typeorm';
import {
  OrderShippingStatusConst,
  OrderShippingTypeConst,
  OrderShippingDriverConst,
} from '../../common/constants/order-shipping.constant';
// import { TimestampWithoutSoftDelete } from '../../common/schemas/timestamp.schema';
import { Orders } from './orders.schema';
// import { Country } from '../../country/schemas/country.schema';
// import { City } from '../../city/schemas/city.schema';
// import { District } from '../../district/schemas/district.schema';
// import { Ward } from '../../ward/schemas/ward.schema';

@Entity({
  name: 'order_shippings',
})
export class OrderShipping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    default: OrderShippingDriverConst.GHTK,
  })
  @Index()
  driver: OrderShippingDriverConst;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Index({
    unique: true,
  })
  shipping_code_request: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Index({
    unique: true,
  })
  shipping_code_response: string;

  @Column({
    type: 'tinyint',
    default: OrderShippingTypeConst.GHTC,
  })
  @Index()
  type: OrderShippingTypeConst;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  price: number;

  @Column({
    type: 'tinyint',
    default: OrderShippingStatusConst.NOT_RECEIVE,
  })
  @Index()
  status: OrderShippingStatusConst;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  phone_number: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'int',
    name: 'order_id',
  })
  @Index()
  orderId: number;

  @ManyToOne(() => Orders, (order) => order.order_shippings)
  @JoinColumn({
    name: 'order_id',
  })
  order: Orders;

  @Column({
    type: 'int',
    name: 'country',
  })
  @Index()
  countryId: number;

  @Column({
    type: 'int',
    name: 'city',
  })
  @Index()
  cityId: number;

  @Column({
    type: 'int',
    name: 'district',
  })
  @Index()
  districtId: number;

  @Column({
    type: 'int',
    name: 'ward',
  })
  @Index()
  wardId: number;
}
