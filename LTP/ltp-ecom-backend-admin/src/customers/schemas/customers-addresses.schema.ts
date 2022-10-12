import { City } from 'src/city/schemas/city.schema';
import { CustomerAddressDefaultConst } from 'src/common/constants/customer.constant';
import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import { Country } from 'src/country/schemas/country.schema';
import { District } from 'src/district/schemas/district.schema';
import { Ward } from 'src/ward/schemas/ward.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customers } from './customers.schema';

@Entity({
  name: 'customer_addresses',
})
export class CustomersAddresses extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'customer' })
  @Index()
  customerId: number;

  @ManyToOne(() => Customers, (customer) => customer.addresses)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customers;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  address: string;

  @Column({ length: 255, type: 'varchar' })
  phone_number: string;

  @Column({ length: 255, type: 'varchar' })
  alias: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: CustomerAddressDefaultConst.NOT_DEFAULT,
  })
  @Index()
  is_default: CustomerAddressDefaultConst;

  @Column({
    type: 'int',
    name: 'country',
  })
  @Index()
  countryId: number;

  @ManyToOne(() => Country)
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

  @ManyToOne(() => City)
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

  @ManyToOne(() => District)
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

  @ManyToOne(() => Ward)
  @JoinColumn({
    name: 'ward',
  })
  ward: Ward;
}
