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
import { Product } from '../../product/schema/product.schema';
import { CustomerReview } from '../../customer-review/schema/customer-review.schema';
import { ProductCategory } from '../../product-category/schema/product-category.schema';
import { Customer } from '../../customer/schema/customer.schema';
import { ProductCombo } from '../../product-combo/schema/product-combo.schema';

@Entity({
  name: 'media_uploads',
})
export class MediaUpload extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  url: string;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_images',
    joinColumn: {
      name: 'image',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @OneToMany(() => CustomerReview, (customerReview) => customerReview.image, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  reviews: CustomerReview[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.image,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  product_categories: ProductCategory[];

  @OneToMany(() => Customer, (customer) => customer.avatar, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  customers: Customer[];

  @ManyToMany(() => ProductCombo)
  @JoinTable({
    name: 'product_combo_images',
    joinColumn: {
      name: 'product_combo',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image',
      referencedColumnName: 'id',
    },
  })
  product_combos: ProductCombo[];
}
