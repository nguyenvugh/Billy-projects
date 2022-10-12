import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/schema/customer.schema';

@Entity({
  name: 'customer_connect_socials',
})
export class CustomerConnectSocial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'customer' })
  @Index()
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customer;

  @Column({ length: 255, type: 'varchar' })
  social_id: string;

  @Column({ length: 255, type: 'varchar' })
  social_type: string;
}
