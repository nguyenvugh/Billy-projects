import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/schemas/product.schema';
import { ProductAttribute } from './product-attribute.schema';

@Entity({
  name: 'product_slug_histories',
})
export class ProductSlugHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.translates)
  @JoinColumn({
    name: 'product',
  })
  product: Product;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  slug: string;
}
