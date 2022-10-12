import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerSpecialProductTypeConst } from '../../common/constants/customer-special-product.constant';
import { TimestampOnlyCreate } from '../../common/schemas/timestamp.schema';
import { Customer } from '../../customer/schema/customer.schema';
import { Product } from '../../product/schema/product.schema';

@Entity({
  name: 'customer_special_products',
})
@Index(['customer', 'product', 'type'], { unique: true })
export class CustomerSpecialProduct extends TimestampOnlyCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'customer' })
  @Index()
  customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.special_products)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customer;

  @Column({ type: 'int', name: 'product' })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.special_customers)
  @JoinColumn({
    name: 'product',
  })
  product: Product;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: CustomerSpecialProductTypeConst.FAVOURITE,
  })
  @Index()
  type: CustomerSpecialProductTypeConst;
}
