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
import {
  ProductStatusConst,
  ProductPopularConst,
  BooleanValue,
} from '../../common/constants';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { ProductCategory } from '../../product-category/schemas/product-category.schema';
// import { ProductTranslate } from './product-translate.schema';
// import { Inventory } from '../../inventory/schemas/inventory.schema';
import { MediaUpload } from '../../media-upload/schemas/media-upload.schema';
import { ProductAttribute } from './product-attribute.schema';

import { OrderDetails } from '../../orders/schemas/order-details.schema';
import { ProductTranslates } from './product-translate.schema';
import { ProductImage } from './product-image.schema';
import { InventoryProduct } from 'src/inventory/schemas/inventory-product.schema';
import { InventoryInputHistoryDetail } from '../../inventory-input-history/schema/inventory-input-history-detail.schema';
import { ProductComboDetail } from '../../product-combo/schema/product-combo-detail.schema';
import { ProductReview } from '../../product-review/schema/product-review.schema';

@Entity({
  name: 'products',
})
export class Product extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  code: string;

  @OneToMany(() => ProductReview, (productReview) => productReview.product)
  product_reviews: ProductReview[];

  // @Column({
  //   type: 'tinyint',
  //   default: ProductPopularConst.POPULAR,
  // })
  // @Index()
  // is_popular: ProductPopularConst;

  @Column({
    type: 'tinyint',
    default: BooleanValue.FALSE,
  })
  @Index()
  is_feature: number;

  @Column({
    type: 'tinyint',
    default: BooleanValue.TRUE,
  })
  @Index()
  status_display: number;

  @Column({
    type: 'tinyint',
    default: ProductStatusConst.STOCKING,
  })
  @Index()
  status: ProductStatusConst;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'float',
  })
  avg_rating: number;

  @Column({
    type: 'int',
  })
  num_sold: number;

  @Column({
    type: 'int',
  })
  num_like: number;

  @Column({
    type: 'int',
  })
  category: number;

  @Column({
    type: 'decimal',
  })
  length: number;

  @Column({
    type: 'decimal',
  })
  width: number;

  @Column({
    type: 'decimal',
  })
  height: number;

  @Column({
    type: 'decimal',
  })
  weight: number;

  @Column({
    type: 'tinyint',
    default: BooleanValue.FALSE,
  })
  allow_cod: number;

  @OneToMany(
    () => ProductTranslates,
    (productTrans) => productTrans.product_obj,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  translates: ProductTranslates[];

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  @Index()
  @JoinColumn({
    name: 'category',
  })
  category_obj: ProductCategory;

  @OneToMany(
    () => ProductAttribute,
    (productAttribute) => productAttribute.product,
  )
  attributes: ProductAttribute[];

  // @ManyToMany(() => Inventory)
  // @JoinTable({
  //   name: 'inventory_products',
  //   joinColumn: {
  //     name: 'product',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'inventory',
  //     referencedColumnName: 'id',
  //   },
  // })
  // inventories: Inventory[];

  // @ManyToMany(() => MediaUpload, (mediaUpload) => mediaUpload.products, {
  //   cascade: ['insert', 'update', 'remove'],
  // })
  // @JoinTable({
  //   name: 'product_images',
  //   joinColumn: {
  //     name: 'product',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'image',
  //     referencedColumnName: 'id',
  //   },
  // })
  // images: MediaUpload[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: ['insert', 'update', 'remove'],
  })
  images: ProductImage[];

  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.product,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  product_inventories: InventoryProduct[];

  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.product,
    {
      cascade: ['insert', 'update', 'remove'],
    },
  )
  product_inventory: InventoryProduct[];

  @OneToMany(() => OrderDetails, (detail) => detail.product, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetails[];

  @OneToMany(
    () => InventoryInputHistoryDetail,
    (inventoryInputHistoryDetail) => inventoryInputHistoryDetail.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  inventory_input_details: InventoryInputHistoryDetail[];

  @OneToMany(
    () => ProductComboDetail,
    (productComboDetail) => productComboDetail.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  combo_details: ProductComboDetail[];
}
