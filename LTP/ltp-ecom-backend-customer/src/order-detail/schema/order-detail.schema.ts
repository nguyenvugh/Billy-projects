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
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Order } from '../../order/schema/order.schema';
import { Product } from '../../product/schema/product.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';
import { OrderShippingDetail } from '../../order-shipping/schema/order-shipping-detail.schema';
import { FlashSale } from '../../flash-sale/schema/flash-sale.schema';
import { Slider } from '../../promotion/schema/slider.schema';
import { ProductCombo } from '../../product-combo/schema/product-combo.schema';
import { Charity } from '../../charity/schema/charity.schema';
import { Coupon } from '../../coupon/schemas/coupon.schema';

@Entity({
  name: 'order_details',
})
export class OrderDetail extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

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
  })
  number: number;

  @Column({
    type: 'int',
    unsigned: true,
  })
  total: number;

  @Column({
    type: 'int',
    name: 'order_id',
  })
  @Index()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.detail)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  productId: number;

  @ManyToOne(() => Product, (product) => product.order_details)
  @JoinColumn({
    name: 'product',
  })
  product: Product;

  @Column({
    type: 'int',
    name: 'inventory',
  })
  @Index()
  inventoryId: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.order_details)
  @JoinColumn({
    name: 'inventory',
  })
  inventory: Inventory;

  @OneToOne(
    () => OrderShippingDetail,
    (orderShippingDetail) => orderShippingDetail.order_detail,
  )
  shipping: OrderShippingDetail;

  @Column({
    type: 'int',
    name: 'flash_sale',
    nullable: true,
  })
  @Index()
  flash_sale_id: number;

  @ManyToOne(() => FlashSale, (flashSale) => flashSale.order_details)
  @JoinColumn({
    name: 'flash_sale',
  })
  flash_sale: FlashSale;

  @Column({
    type: 'int',
    name: 'promotion',
    nullable: true,
  })
  @Index()
  promotion_id: number;

  @ManyToOne(() => Slider, (slider) => slider.order_details)
  @JoinColumn({
    name: 'promotion',
  })
  promotion: Slider;

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

  @ManyToOne(() => Coupon, (coupon) => coupon.order_details)
  @JoinColumn({
    name: 'coupon',
  })
  coupon: Coupon;
}
