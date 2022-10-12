import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerSpecialProductComboTypeConst } from '../../common/constants/customer-special-product-combo.constant';
import { TimestampOnlyCreate } from '../../common/schemas/timestamp.schema';
import { Customer } from '../../customer/schema/customer.schema';
import { ProductCombo } from '../../product-combo/schema/product-combo.schema';

@Entity({
  name: 'customer_special_product_combos',
})
@Index(['customer', 'product_combo', 'type'], { unique: true })
export class CustomerSpecialProductCombo extends TimestampOnlyCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'customer' })
  @Index()
  customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.special_product_combos)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customer;

  @Column({ type: 'int', name: 'product_combo' })
  @Index()
  product_combo_id: number;

  @ManyToOne(
    () => ProductCombo,
    (productCombo) => productCombo.special_customers,
  )
  @JoinColumn({
    name: 'product_combo',
  })
  product_combo: ProductCombo;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: CustomerSpecialProductComboTypeConst.FAVOURITE,
  })
  @Index()
  type: CustomerSpecialProductComboTypeConst;
}
