import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { City } from '../../city/schemas/city.schema';
import { OrderShippings } from '../../orders/schemas/order-shippings.schema';
import { Inventory } from '../../inventory/schemas/inventory.schema';

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

  @OneToMany(() => OrderShippings, (orderShipping) => orderShipping.country, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShippings[];

  @OneToMany(() => Inventory, (inventory) => inventory.country, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];
}
