import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import {
  CustomerReviewRating,
  CustomerReviewStatus,
} from '../../common/constants/product.constant';
import { Customers } from '../../customers/schemas/customers.schema';
import { Product } from '../../product/schemas/product.schema';
import { MediaUpload } from '../../media-upload/schemas/media-upload.schema';

@Entity({
  name: 'customer_reviews',
})
@Index(['customer', 'product', 'deleted_at'], { unique: true })
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  content: string;

  @Column({ enum: CustomerReviewRating })
  rating: CustomerReviewRating;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: CustomerReviewStatus.PENDING,
  })
  @Index()
  status: CustomerReviewStatus;

  @Column({ type: 'int', name: 'product' })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.product_reviews)
  @JoinColumn({ name: 'product' })
  product: Product;

  @Column({ type: 'int', name: 'customer' })
  @Index()
  customerId: number;

  @ManyToOne(() => Customers, (customer) => customer.product_reviews)
  @JoinColumn({ name: 'customer' })
  customer: Customers;

  @Column({ type: 'int', name: 'image', nullable: true })
  @Index()
  image_id: number;

  @ManyToOne(() => MediaUpload, (image) => image.product_reviews)
  @JoinColumn({
    name: 'image',
  })
  image: MediaUpload;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
