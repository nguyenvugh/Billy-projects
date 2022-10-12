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
import { Country } from '../../country/schemas/country.schema';
import { District } from '../../district/schemas/district.schema';
import { OrderShippings } from '../../orders/schemas/order-shippings.schema';
import { Inventory } from '../../inventory/schemas/inventory.schema';

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

  @OneToMany(() => OrderShippings, (orderShipping) => orderShipping.city, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShippings[];

  @OneToMany(() => Inventory, (inventory) => inventory.city, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];
}
