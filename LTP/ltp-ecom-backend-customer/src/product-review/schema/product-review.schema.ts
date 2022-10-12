import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerReviewRating } from '../../common/constants/customer-review.constant';
import { ProductReviewStatus } from '../../common/constants/product.constant';
import { Customer } from '../../customer/schema/customer.schema';
import { Product } from '../../product/schema/product.schema';

@Entity({ name: 'product_review' })
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  content: string;

  @Column({ enum: CustomerReviewRating })
  rating: CustomerReviewRating;

  @Column({
    enum: ProductReviewStatus,
    default: ProductReviewStatus.PROCESSING,
  })
  status: ProductReviewStatus;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.product_reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.product_reviews)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
