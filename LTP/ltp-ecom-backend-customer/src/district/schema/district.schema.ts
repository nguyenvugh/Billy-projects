import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { City } from '../../city/schema/city.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';
import { CustomerAddress } from '../../customer-address/schema/customer-address.schema';
import { Ward } from '../../ward/schema/ward.schema';
import { OrderShipping } from '../../order-shipping/schema/order-shipping.schema';

@Entity({
  name: 'districts',
})
export class District extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({
    type: 'int',
    name: 'city',
  })
  @Index()
  cityId: number;

  @ManyToOne(() => City, (city) => city.districts)
  @JoinColumn({
    name: 'city',
  })
  city: City;

  @OneToMany(() => Inventory, (inventory) => inventory.district, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];

  @OneToMany(() => Ward, (ward) => ward.district, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  wards: Ward[];

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.district,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  customer_addresses: CustomerAddress[];

  @OneToMany(() => OrderShipping, (orderShipping) => orderShipping.district, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShipping[];
}
