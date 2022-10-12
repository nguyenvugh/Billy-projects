import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  CustomerReviewStatus,
  CustomerReviewRating,
} from '../../common/constants/customer-review.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Customer } from '../../customer/schema/customer.schema';
import { Product } from '../../product/schema/product.schema';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';

@Entity({
  name: 'customer_reviews',
})
@Index(['customer', 'product', 'deleted_at'], { unique: true })
export class CustomerReview extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'customer' })
  @Index()
  customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customer;

  @Column({ type: 'int', name: 'product' })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({
    name: 'product',
  })
  product: Product;

  @Column({ type: 'int', name: 'image', nullable: true })
  @Index()
  image_id: number;

  @ManyToOne(() => MediaUpload, (image) => image.reviews)
  @JoinColumn({
    name: 'image',
  })
  image: MediaUpload;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: CustomerReviewStatus.PENDING,
  })
  @Index()
  status: CustomerReviewStatus;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  rating: CustomerReviewRating;

  @Column({ length: 255, type: 'varchar', nullable: true })
  content: string;
}
