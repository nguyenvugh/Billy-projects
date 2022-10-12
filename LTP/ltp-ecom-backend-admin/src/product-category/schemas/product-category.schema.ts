import { BooleanValue } from 'src/common/constants';
import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';
import { Product } from 'src/product/schemas/product.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { ProductCategoryTranslate } from './product-category-translate.schema';

@Entity({
  name: 'product_categories',
})
export class ProductCategory extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  image: number;

  @OneToOne(() => MediaUpload, { eager: true })
  @JoinColumn({
    name: 'image',
  })
  image_obj: MediaUpload;

  @Column({
    type: 'char',
  })
  code: string;

  @Column({
    type: 'int',
    default: BooleanValue.FALSE,
  })
  is_feature: number;

  @Column({
    type: 'int',
    default: 0,
  })
  count_products: number;

  @Column({
    type: 'int',
    default: -1,
    name: 'order_display',
  })
  @Index()
  order: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  parent: number;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.childs)
  @Index()
  @JoinColumn({
    name: 'parent',
  })
  parent_obj: ProductCategory;

  @OneToMany(() => Product, (product) => product.category, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  products: Product[];

  @OneToMany(
    () => ProductCategoryTranslate,
    (productCategoryTranslate) => productCategoryTranslate.product_category_obj,
    {
      eager: true,
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
      cascade: ['insert', 'update', 'remove'],
    },
  )
  translates: ProductCategoryTranslate[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.parent,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  childs: ProductCategory[];
}
