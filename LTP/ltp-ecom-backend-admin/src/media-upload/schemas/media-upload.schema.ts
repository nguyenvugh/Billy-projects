import { ProductImage } from 'src/product/schemas/product-image.schema';
import { Product } from 'src/product/schemas/product.schema';
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
import { ProductComboImage } from '../../product-combo/schema/product-combo-image.schema';
import { ProductReview } from '../../product-review/schema/product-review.schema';

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

  @OneToMany(() => ProductImage, (productImage) => productImage.image)
  images: ProductImage[];

  @OneToMany(
    () => ProductComboImage,
    (productComboImage) => productComboImage.image,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  product_combo_images: ProductComboImage[];

  @OneToMany(() => ProductReview, (customerReview) => customerReview.image, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  product_reviews: ProductReview[];

  // @ManyToMany(() => Product, (product) => product.images)
  // @JoinTable({
  //   name: 'product_images',
  //   joinColumn: {
  //     name: 'image',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'product',
  //     referencedColumnName: 'id',
  //   },
  // })
  // products: Product[];
}
