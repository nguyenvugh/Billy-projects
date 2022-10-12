import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  CustomerSexConst,
  CustomerStatusConst,
} from '../../common/constants/customer.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { CustomerReview } from '../../customer-review/schema/customer-review.schema';
import { CustomerAddress } from '../../customer-address/schema/customer-address.schema';
import { Order } from '../../order/schema/order.schema';
import { CustomerConnectSocial } from './customer-connect-social.schema';
import { MediaUpload } from '../../media-upload/schema/media-upload.schema';
import { CustomerSpecialProduct } from '../../customer-special-product/schema/customer-special-product.schema';
import { CustomerSpecialProductCombo } from '../../customer-special-product-combo/schema/customer-special-product-combo.schema';
import { ProductReview } from '../../product-review/schema/product-review.schema';

@Entity({
  name: 'customers',
})
export class Customer extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  email: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  @Index()
  phone_number: string;

  @Column({ length: 255, type: 'varchar', select: false })
  password: string;

  @Column({
    type: 'tinyint',
    default: CustomerSexConst.MALE,
  })
  sex: CustomerSexConst;

  @Column({
    type: 'tinyint',
    default: CustomerStatusConst.NOT_ACTIVE,
  })
  status: CustomerStatusConst;

  @Column({ length: 10, nullable: true, type: 'varchar' })
  birthday: string;

  @Column({ nullable: true, type: 'int', name: 'avatar' })
  @Index()
  avatar_id: number;

  @ManyToOne(() => MediaUpload, (mediaUpload) => mediaUpload.customers)
  @JoinColumn({
    name: 'avatar',
  })
  avatar: MediaUpload;

  @Column({ length: 255, type: 'varchar', nullable: true, select: false })
  activation_code: string;

  @Column({ nullable: true, type: 'timestamp', select: false })
  activation_expire: Date;

  @Column({ length: 255, type: 'varchar', nullable: true, select: false })
  reset_password_code: string;

  @Column({ nullable: true, type: 'timestamp', select: false })
  reset_password_expire: Date;

  @OneToMany(
    () => CustomerReview,
    (customerReview) => customerReview.customer,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  reviews: CustomerReview[];

  @OneToMany(() => ProductReview, (productReview) => productReview.customer)
  product_reviews: ProductReview[];

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.customer,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  addresses: CustomerAddress[];

  @OneToMany(() => Order, (order) => order.customer, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  orders: Order[];

  @OneToMany(
    () => CustomerConnectSocial,
    (customerSocial) => customerSocial.customer,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  customer_socials: CustomerConnectSocial[];

  @OneToMany(
    () => CustomerSpecialProduct,
    (customerSpecialProduct) => customerSpecialProduct.product,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  special_products: CustomerSpecialProduct[];

  @OneToMany(
    () => CustomerSpecialProductCombo,
    (customerSpecialProductCombo) => customerSpecialProductCombo.customer,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  special_product_combos: CustomerSpecialProductCombo[];
}
/*
export const Customer = new EntitySchema({
  name: 'customers',
  columns: {
    ...IdAutoIncrement,
    name: {
      name: 'name',
      type: String,
      length: 255,
    },
    email: {
      name: 'email',
      type: String,
      length: 255,
    },
    phone_number: {
      name: 'phone_number',
      type: String,
      length: 255,
    },
    password: {
      name: 'password',
      type: String,
      length: 255,
    },
    sex: {
      name: 'sex',
      type: 'enum',
      enum: [
        CustomerSexConst.MALE,
        CustomerSexConst.FEMAIL,
        CustomerSexConst.UNKNOW,
      ],
      default: CustomerSexConst.MALE,
    },
    birthday: {
      name: 'birthday',
      type: String,
      length: 10,
      nullable: true,
    },
    reset_password_code: {
      name: 'reset_password_code',
      type: String,
      length: 255,
      nullable: true,
    },
    reset_password_expire: {
      name: 'reset_password_expire',
      type: 'timestamp',
      nullable: true,
    },
    ...Timestamp,
    ...SoftDelete,
  },
});
*/
