import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductFeatureConst } from '../../common/constants/product-category.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Product } from '../../product/schema/product.schema';
import { ProductCategoryTranslate } from '../../product-category-translate/schema/product-category-translate.schema';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';

@Entity({
  name: 'product_categories',
})
export class ProductCategory extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    default: ProductFeatureConst.NOT_FEATURE,
  })
  @Index()
  is_feature: ProductFeatureConst;

  @Column({
    type: 'int',
    unsigned: true,
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
    name: 'parent',
  })
  @Index()
  parentId: number;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.childs)
  @JoinColumn({
    name: 'parent',
  })
  parent: ProductCategory;

  @Column({ type: 'int', name: 'image', nullable: true })
  @Index()
  imageId: number;

  @ManyToOne(() => MediaUpload, (image) => image.product_categories)
  @JoinColumn({
    name: 'image',
  })
  image: MediaUpload;

  @OneToMany(() => Product, (product) => product.category, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  products: Product[];

  @OneToMany(
    () => ProductCategoryTranslate,
    (productCategoryTranslate) => productCategoryTranslate.product_category,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
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
