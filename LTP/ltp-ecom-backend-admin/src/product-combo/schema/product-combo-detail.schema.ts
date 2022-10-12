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
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { ProductCombo } from './product-combo.schema';
import { Product } from '../../product/schemas/product.schema';

@Entity({
  name: 'product_combo_details',
})
@Index(['product_combo', 'product', 'deleted_at'], { unique: true })
export class ProductComboDetail extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  percentage: number;

  @Column({
    type: 'int',
    name: 'product_combo',
  })
  @Index()
  product_combo_id: number;

  @ManyToOne(() => ProductCombo, (productCombo) => productCombo.details)
  @JoinColumn({
    name: 'product_combo',
  })
  product_combo: ProductCombo;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.combo_details)
  @JoinColumn({
    name: 'product',
  })
  product: Product;
}
