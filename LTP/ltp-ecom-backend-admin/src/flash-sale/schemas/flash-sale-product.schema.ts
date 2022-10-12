import { FlashSaleProductStatusConst } from 'src/common/constants/flash-sale.constant';
import { Product } from 'src/product/schemas/product.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { FlashSale } from './flash-sale.schema';

@Entity({
  name: 'flash_sale_products',
})
export class FlashSaleProduct extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  flash_sale: number;

  @ManyToOne(() => FlashSale, (flashSale) => flashSale.products)
  @JoinColumn({
    name: 'flash_sale',
  })
  flash_sale_obj: FlashSale;

  @Column({
    name: 'product',
    type: 'int',
  })
  product: number;

  @ManyToOne(() => Product)
  @JoinColumn([
    {
      name: 'product',
      referencedColumnName: 'id',
    },
  ])
  product_obj: Product;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  percentage: number;

  @Column({
    type: 'tinyint',
    name: 'status',
    default: FlashSaleProductStatusConst.JUST_OPEN_FOR_SALE,
  })
  status: FlashSaleProductStatusConst;

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
}
