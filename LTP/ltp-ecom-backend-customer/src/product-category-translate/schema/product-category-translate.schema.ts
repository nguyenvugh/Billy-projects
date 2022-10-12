import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { ProductCategory } from '../../product-category/schema/product-category.schema';

@Entity({
  name: 'product_category_translates',
})
export class ProductCategoryTranslate {
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
  )
  @JoinColumn({
    name: 'product_category',
  })
  product_category: ProductCategory;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
