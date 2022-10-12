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
  ProductStatusDisplayConst,
} from '../../common/constants/product.constant';
import { BooleanValue } from '../../common/constants/global.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { ProductCategory } from '../../product-category/schema/product-category.schema';
import { ProductTranslate } from '../../product-translate/schema/product-translate.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';
import { CustomerReview } from '../../customer-review/schema/customer-review.schema';
import { OrderDetail } from '../../order-detail/schema/order-detail.schema';
import { InventoryProduct } from '../../inventory-product/schema/inventory-product.schema';
import { CustomerSpecialProduct } from '../../customer-special-product/schema/customer-special-product.schema';
import { FlashSaleProduct } from '../../flash-sale/schema/flash-sale-product.schema';
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

  @Column({
    type: 'tinyint',
    default: ProductPopularConst.POPULAR,
  })
  @Index()
  is_feature: ProductPopularConst;

  @Column({
    type: 'tinyint',
    default: ProductStatusConst.STOCKING,
  })
  @Index()
  status: ProductStatusConst;

  @Column({
    type: 'tinyint',
    default: ProductStatusDisplayConst.SHOW,
  })
  @Index()
  status_display: ProductStatusDisplayConst;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'float',
  })
  avg_rating: number;

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
    type: 'int',
  })
  num_like: number;

  @Column({
    type: 'int',
  })
  num_sold: number;

  @Column({
    type: 'tinyint',
    default: BooleanValue.FALSE,
  })
  allow_cod: number;

  @Column({
    type: 'int',
    name: 'category',
  })
  @Index()
  categoryId: number;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  @JoinColumn({
    name: 'category',
  })
  category: ProductCategory;

  @OneToMany(
    () => ProductTranslate,
    (productTranslate) => productTranslate.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  translates: ProductTranslate[];

  @OneToMany(() => ProductReview, (productReview) => productReview.product)
  product_reviews: ProductReview[];

  @ManyToMany(() => Inventory)
  @JoinTable({
    name: 'inventory_products',
    joinColumn: {
      name: 'product',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'inventory',
      referencedColumnName: 'id',
    },
  })
  inventories: Inventory[];

  @ManyToMany(() => MediaUpload)
  @JoinTable({
    name: 'product_images',
    joinColumn: {
      name: 'product',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image',
      referencedColumnName: 'id',
    },
  })
  images: MediaUpload[];

  @OneToMany(() => CustomerReview, (customerReview) => customerReview.product, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  reviews: CustomerReview[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetail[];

  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  inventory_products: InventoryProduct[];

  @OneToMany(
    () => CustomerSpecialProduct,
    (customerSpecialProduct) => customerSpecialProduct.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  special_customers: CustomerSpecialProduct[];

  @OneToMany(
    () => FlashSaleProduct,
    (flashSaleProduct) => flashSaleProduct.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  flash_sale_products: FlashSaleProduct[];

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
