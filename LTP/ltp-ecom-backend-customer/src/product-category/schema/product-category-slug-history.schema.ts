import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { ProductCategory } from './product-category.schema';

@Entity({
  name: 'product_category_slug_histories',
})
export class ProductCategorySlugHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'product_category',
  })
  @Index()
  product_category_id: number;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.translates,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: false },
  )
  @JoinColumn({
    name: 'product_category',
  })
  product_category: ProductCategory;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ type: 'mediumtext' })
  slug: string;
}
