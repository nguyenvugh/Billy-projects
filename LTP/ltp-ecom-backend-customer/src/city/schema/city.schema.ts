import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Country } from '../../country/schema/country.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';
import { District } from '../../district/schema/district.schema';
import { CustomerAddress } from '../../customer-address/schema/customer-address.schema';
import { OrderShipping } from '../../order-shipping/schema/order-shipping.schema';
import { MapInventoryCityToCustomerCity } from './map_inventory_city_to_customer_city.schema';

@Entity({
  name: 'cities',
})
export class City extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({
    type: 'int',
    name: 'country',
  })
  @Index()
  countryId: number;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn({
    name: 'country',
  })
  country: Country;

  @OneToMany(() => District, (district) => district.city, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  districts: District[];

  @OneToMany(() => Inventory, (inventory) => inventory.city, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];

  @OneToMany(() => CustomerAddress, (customerAddress) => customerAddress.city, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  customer_addresses: CustomerAddress[];

  @OneToMany(() => OrderShipping, (orderShipping) => orderShipping.city, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShipping[];

  @OneToMany(
    () => MapInventoryCityToCustomerCity,
    (mapInventoryCityToCustomerCity) =>
      mapInventoryCityToCustomerCity.inventory_city,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  inventory_cities: MapInventoryCityToCustomerCity[];

  @OneToMany(
    () => MapInventoryCityToCustomerCity,
    (mapInventoryCityToCustomerCity) =>
      mapInventoryCityToCustomerCity.customer_city,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  customer_cities: MapInventoryCityToCustomerCity[];
}
