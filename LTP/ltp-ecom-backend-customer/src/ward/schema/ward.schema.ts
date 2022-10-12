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
import { District } from '../../district/schema/district.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';
import { CustomerAddress } from '../../customer-address/schema/customer-address.schema';
import { OrderShipping } from '../../order-shipping/schema/order-shipping.schema';

@Entity({
  name: 'wards',
})
export class Ward extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({
    type: 'int',
    name: 'district',
  })
  @Index()
  districtId: number;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({
    name: 'district',
  })
  district: District;

  @OneToMany(() => Inventory, (inventory) => inventory.ward, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];

  @OneToMany(() => CustomerAddress, (customerAddress) => customerAddress.ward, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  customer_addresses: CustomerAddress[];

  @OneToMany(() => OrderShipping, (orderShipping) => orderShipping.ward, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShipping[];
}
