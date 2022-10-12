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
  name: 'product_translates',
})
export class ProductTranslates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.translates)
  @Index()
  @JoinColumn({
    name: 'product',
  })
  product_obj: Product;

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
