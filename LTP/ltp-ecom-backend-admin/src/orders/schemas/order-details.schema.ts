import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
} from 'typeorm';

import { Orders } from './orders.schema';
import { Product } from '../../product/schemas/product.schema';
import { ProductCombo } from '../../product-combo/schema/product-combo.schema';
import { OrderShippingDetail } from './order-shipping-detail.schema';
import { Inventory } from '../../inventory/schemas/inventory.schema';
import { Charity } from '../../charity/schemas/charity.schema';

@Entity({
  name: 'order_details',
})
export class OrderDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, (order) => order.order_details)
  @Column({
    type: 'int',
    name: 'order_id',
  })
  @JoinColumn([
    {
      name: 'order_id',
      referencedColumnName: 'id',
    },
  ])
  order_id: Orders;

  @ManyToOne(() => Product, (product) => product.order_details)
  @JoinColumn([
    {
      name: 'product',
      referencedColumnName: 'id',
    },
  ])
  product: Product;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  product_id: number;

  @Column({
    type: 'int',
    name: 'inventory',
  })
  @Index()
  inventory_id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.order_details)
  @JoinColumn({
    name: 'inventory',
  })
  inventory: Inventory;

  @Column({
    type: 'int',
    unsigned: true,
  })
  original_price: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  sale_price: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  promotion_price: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  combo_price: number;

  @Column({
    type: 'int',
    name: 'product_combo',
    nullable: true,
  })
  @Index()
  product_combo_id: number;

  @ManyToOne(() => ProductCombo, (productCombo) => productCombo.order_details)
  @JoinColumn({
    name: 'product_combo',
  })
  product_combo: ProductCombo;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  coupon_price: number;

  @Column({
    type: 'int',
    name: 'charity',
    nullable: true,
  })
  @Index()
  charity_id: number;

  @ManyToOne(() => Charity, (charity) => charity.order_details)
  @JoinColumn({
    name: 'charity',
  })
  charity: Charity;

  @Column({
    type: 'int',
  })
  number: number;

  @Column({
    type: 'int',
  })
  total: number;

  @OneToOne(
    () => OrderShippingDetail,
    (orderShippingDetail) => orderShippingDetail.order_detail,
  )
  shipping: OrderShippingDetail;
}
