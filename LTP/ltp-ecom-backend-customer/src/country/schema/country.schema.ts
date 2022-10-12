import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { City } from '../../city/schema/city.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';
import { CustomerAddress } from '../../customer-address/schema/customer-address.schema';
import { OrderShipping } from '../../order-shipping/schema/order-shipping.schema';

@Entity({
  name: 'countries',
})
export class Country extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, type: 'varchar' })
  @Index()
  code: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @OneToMany(() => City, (city) => city.country, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  cities: City[];

  @OneToMany(() => Inventory, (inventory) => inventory.country, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.country,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  customer_addresses: CustomerAddress[];

  @OneToMany(() => OrderShipping, (orderShipping) => orderShipping.country, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShipping[];
}
