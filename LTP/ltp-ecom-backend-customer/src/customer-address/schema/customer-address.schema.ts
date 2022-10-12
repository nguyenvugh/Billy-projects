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
import { CustomerAddressDefault } from '../../common/constants/customer-address.constant';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Country } from '../../country/schema/country.schema';
import { City } from '../../city/schema/city.schema';
import { District } from '../../district/schema/district.schema';
import { Ward } from '../../ward/schema/ward.schema';
import { Customer } from '../../customer/schema/customer.schema';

@Entity({
  name: 'customer_addresses',
})
export class CustomerAddress extends TimestampWithSoftDelete {
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
  name: string;

  @Column({ length: 255, type: 'varchar' })
  address: string;

  @Column({ length: 255, type: 'varchar' })
  phone_number: string;

  @Column({ length: 255, type: 'varchar', nullable: true })
  alias: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: CustomerAddressDefault.NOT_DEFAULT,
  })
  @Index()
  is_default: CustomerAddressDefault;

  @Column({
    type: 'int',
    name: 'country',
  })
  @Index()
  countryId: number;

  @ManyToOne(() => Country, (country) => country.customer_addresses)
  @JoinColumn({
    name: 'country',
  })
  country: Country;

  @Column({
    type: 'int',
    name: 'city',
  })
  @Index()
  cityId: number;

  @ManyToOne(() => City, (city) => city.customer_addresses)
  @JoinColumn({
    name: 'city',
  })
  city: City;

  @Column({
    type: 'int',
    name: 'district',
  })
  @Index()
  districtId: number;

  @ManyToOne(() => District, (district) => district.customer_addresses)
  @JoinColumn({
    name: 'district',
  })
  district: District;

  @Column({
    type: 'int',
    name: 'ward',
  })
  @Index()
  wardId: number;

  @ManyToOne(() => Ward, (ward) => ward.customer_addresses)
  @JoinColumn({
    name: 'ward',
  })
  ward: Ward;
}
