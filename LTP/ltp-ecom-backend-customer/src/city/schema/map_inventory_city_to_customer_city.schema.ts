import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { City } from './city.schema';

@Entity({
  name: 'map_inventory_city_to_customer_cities',
})
export class MapInventoryCityToCustomerCity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'inventory_city',
  })
  @Index()
  inventory_city_id: number;

  @ManyToOne(() => City, (city) => city.inventory_cities)
  @JoinColumn({
    name: 'inventory_city',
  })
  inventory_city: City;

  @Column({
    type: 'int',
    name: 'customer_city',
  })
  @Index()
  customer_city_id: number;

  @ManyToOne(() => City, (city) => city.customer_cities)
  @JoinColumn({
    name: 'customer_city',
  })
  customer_city: City;
}
