import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TimestampOnlyCreate } from '../../common/schemas/timestamp.schema';

@Entity({
  name: 'customer_contact_forms',
})
export class CustomerContactForm extends TimestampOnlyCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  email: string;

  @Column({ length: 255, type: 'varchar' })
  phone_number: string;

  @Column({
    type: 'text',
  })
  content: string;
}
