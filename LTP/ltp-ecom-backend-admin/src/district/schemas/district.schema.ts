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
import { City } from '../../city/schemas/city.schema';
import { Ward } from '../../ward/schemas/ward.schema';
import { OrderShippings } from '../../orders/schemas/order-shippings.schema';
import { Inventory } from '../../inventory/schemas/inventory.schema';

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

  @OneToMany(() => Ward, (ward) => ward.district, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
    cascade: true,
  })
  wards: Ward[];

  @OneToMany(() => OrderShippings, (orderShipping) => orderShipping.district, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShippings[];

  @OneToMany(() => Inventory, (inventory) => inventory.district, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];
}
