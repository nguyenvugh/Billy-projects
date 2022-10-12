import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/schema/product.schema';

@Entity({
  name: 'product_translates',
})
export class ProductTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  productId: number;

  @ManyToOne(() => Product, (product) => product.translates)
  @JoinColumn({
    name: 'product',
  })
  product: Product;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  slug: string;

  @Column({ type: 'text' })
  short_desc: string;

  @Column({ type: 'mediumtext' })
  description: string;
}
