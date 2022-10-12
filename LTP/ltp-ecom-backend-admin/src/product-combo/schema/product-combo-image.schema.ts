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
import { BooleanValue } from '../../common/constants';
import { ProductCombo } from './product-combo.schema';
import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';

@Entity({
  name: 'product_combo_images',
})
@Index(['product_combo', 'image', 'is_thumbnail'], { unique: true })
export class ProductComboImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    default: BooleanValue.FALSE,
  })
  @Index()
  is_thumbnail: number;

  // @Column()
  // product: number;

  @Column({
    type: 'int',
    name: 'product_combo',
  })
  @Index()
  product_combo_id: number;

  @ManyToOne(() => ProductCombo, (productCombo) => productCombo.images)
  @JoinColumn({
    name: 'product_combo',
  })
  product_combo: ProductCombo;

  @Column({
    type: 'int',
    name: 'image',
  })
  @Index()
  image_id: number;

  @ManyToOne(
    () => MediaUpload,
    (mediaUpload) => mediaUpload.product_combo_images,
  )
  @JoinColumn({ name: 'image' })
  image: MediaUpload;
}
