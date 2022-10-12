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
import { BooleanValue } from '../../common/constants';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { ProductComboDetail } from './product-combo-detail.schema';
import { ProductComboImage } from './product-combo-image.schema';
import { ProductComboTranslate } from './product-combo-translate.schema';
import { OrderDetails } from '../../orders/schemas/order-details.schema';

@Entity({
  name: 'product_combos',
})
@Index(['code', 'deleted_at'], { unique: true })
export class ProductCombo extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  code: string;

  @Column({
    type: 'tinyint',
    default: BooleanValue.TRUE,
  })
  @Index()
  status: number;

  @Column({
    type: 'float',
    default: 0,
  })
  avg_rating: number;

  @Column({
    type: 'int',
    default: 0,
  })
  num_sold: number;

  @Column({
    type: 'int',
    default: 0,
  })
  num_like: number;

  @Column({
    type: 'int',
    default: 0,
  })
  number_products: number;

  // TODO: because product price can change after create product combo
  // TODO: need research to make sure product price alway sync with product combo price
  @Column({
    type: 'int',
    default: 0,
  })
  @Index()
  total_price: number;

  @OneToMany(
    () => ProductComboDetail,
    (productComboDetail) => productComboDetail.product_combo,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  details: ProductComboDetail[];

  @OneToMany(
    () => ProductComboImage,
    (productComboImage) => productComboImage.product_combo,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  images: ProductComboImage[];

  @OneToMany(
    () => ProductComboTranslate,
    (productComboTranslate) => productComboTranslate.product_combo,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  translates: ProductComboTranslate[];

  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.product_combo, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetails[];
}
