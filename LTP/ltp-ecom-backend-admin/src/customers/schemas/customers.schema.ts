import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  CustomerSexConst,
  CustomerStatusConst,
} from '../../common/constants/customer.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';

import { Orders } from '../../orders/schemas/orders.schema';
import { ProductReview } from '../../product-review/schema/product-review.schema';
import { CustomersAddresses } from './customers-addresses.schema';

@Entity({
  name: 'customers',
})
export class Customers extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  email: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  phone_number: string;

  @OneToMany(() => ProductReview, (productReview) => productReview.customer)
  product_reviews: ProductReview[];

  @Column({ length: 255, type: 'varchar', select: false })
  password: string;

  @Column({
    type: 'tinyint',
    default: CustomerSexConst.MALE,
  })
  sex: number;

  @Column({ length: 10, nullable: true, type: 'varchar' })
  birthday: string;

  @Column({ nullable: true, type: 'int' })
  @Index()
  avatar: number;

  @OneToOne(() => MediaUpload)
  @JoinColumn({
    name: 'avatar',
  })
  avatar_obj: MediaUpload;

  @Column({
    type: 'tinyint',
    default: CustomerStatusConst.INACTIVATED,
  })
  status: CustomerStatusConst;

  @Column({ type: 'text' })
  lock_reason: string;

  @Column({ length: 255, type: 'varchar', nullable: true, select: false })
  reset_password_code: string;

  @Column({ nullable: true, type: 'timestamp', select: false })
  reset_password_expire: Date;

  @OneToMany(() => Orders, (order) => order.customer, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  orders: Orders[];

  @OneToMany(() => CustomersAddresses, (address) => address.customer, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  addresses: CustomersAddresses[];
}
