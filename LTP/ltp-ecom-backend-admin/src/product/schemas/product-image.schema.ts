import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';
import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  Column,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/schemas/product.schema';
import { ConfigProductAttribute } from './config-product-attribute.schema';
import { ProductAttributeTranslates } from './product-attribute-translate.schema';

@Entity({
  name: 'product_images',
})
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  is_thumbnail: number;

  // @Column()
  // product: number;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => MediaUpload, (mediaUpload) => mediaUpload.images)
  @JoinColumn({ name: 'image' })
  image: MediaUpload;
}
