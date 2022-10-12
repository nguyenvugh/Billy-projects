import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { FlashSaleProductStatusConst } from '../../common/constants/flash-sale.constant';
import { FlashSale } from './flash-sale.schema';
import { Product } from '../../product/schema/product.schema';

@Entity({
  name: 'flash_sale_products',
})
export class FlashSaleProduct extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'flash_sale' })
  @Index()
  flash_sale_id: number;

  @ManyToOne(() => FlashSale, (flashSale) => flashSale.products)
  @JoinColumn({
    name: 'flash_sale',
  })
  flash_sale: FlashSale;

  @Column({
    name: 'product',
    type: 'int',
  })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.flash_sale_products)
  @JoinColumn([
    {
      name: 'product',
    },
  ])
  product: Product;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  percentage: number;

  @Column({
    type: 'tinyint',
    name: 'status',
    default: FlashSaleProductStatusConst.JUST_OPEN_FOR_SALE,
  })
  status: FlashSaleProductStatusConst;
}
