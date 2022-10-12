import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { FlashSaleStatusConst } from '../../common/constants/flash-sale.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { FlashSaleProduct } from './flash-sale-product.schema';
import { OrderDetail } from '../../order-detail/schema/order-detail.schema';

@Entity({
  name: 'flash_sale',
})
export class FlashSale extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: Date;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({
    type: 'tinyint',
    name: 'status',
    default: FlashSaleStatusConst.ON,
  })
  status: FlashSaleStatusConst;

  @Column({ type: 'int', name: 'admin' })
  @Index()
  created_by: number;

  @OneToMany(
    () => FlashSaleProduct,
    (flashSaleProduct) => flashSaleProduct.flash_sale,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  products: FlashSaleProduct[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.flash_sale, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetail[];
}
