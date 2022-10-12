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
import { BooleanValue } from '../../common/constants/global.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { ProductComboDetail } from './product-combo-detail.schema';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';
import { ProductComboTranslate } from './product-combo-translate.schema';
import { OrderDetail } from '../../order-detail/schema/order-detail.schema';
import { CustomerSpecialProductCombo } from '../../customer-special-product-combo/schema/customer-special-product-combo.schema';

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

  @ManyToMany(() => MediaUpload)
  @JoinTable({
    name: 'product_combo_images',
    joinColumn: {
      name: 'product_combo',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image',
      referencedColumnName: 'id',
    },
  })
  images: MediaUpload[];

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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product_combo, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetail[];

  @OneToMany(
    () => CustomerSpecialProductCombo,
    (customerSpecialProductCombo) => customerSpecialProductCombo.product_combo,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  special_customers: CustomerSpecialProductCombo[];
}
