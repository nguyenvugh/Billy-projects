import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import { Product } from 'src/product/schemas/product.schema';
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
import {
  ProductStatusConst,
  ProductPopularConst,
  BooleanValue,
} from '../../common/constants';
import { InventoryProduct } from './inventory-product.schema';
import { Country } from '../../country/schemas/country.schema';
import { City } from '../../city/schemas/city.schema';
import { District } from '../../district/schemas/district.schema';
import { Ward } from '../../ward/schemas/ward.schema';
import { InventoryInputHistory } from '../../inventory-input-history/schema/inventory-input-history.schema';
import { OrderDetails } from '../../orders/schemas/order-details.schema';

@Entity({
  name: 'inventories',
})
@Index(['code', 'deleted_at'], { unique: true })
@Index(['name', 'deleted_at'], { unique: true })
export class Inventory extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  code: string;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  name: string;

  @Column({ length: 255, type: 'varchar' })
  address: string;

  @Column({ length: 255, type: 'varchar' })
  phone_number: string;

  @Column({
    type: 'float',
  })
  lat: number;

  @Column({
    type: 'float',
  })
  lng: number;

  @Column({
    type: 'int',
    name: 'country',
  })
  @Index()
  country_id: number;

  @ManyToOne(() => Country, (country) => country.inventories)
  @JoinColumn({
    name: 'country',
  })
  country: Country;

  @Column({
    type: 'int',
    name: 'city',
  })
  @Index()
  city_id: number;

  @ManyToOne(() => City, (city) => city.inventories)
  @JoinColumn({
    name: 'city',
  })
  city: City;

  @Column({
    type: 'int',
    name: 'district',
  })
  @Index()
  district_id: number;

  @ManyToOne(() => District, (district) => district.inventories)
  @JoinColumn({
    name: 'district',
  })
  district: District;

  @Column({
    type: 'int',
    name: 'ward',
  })
  @Index()
  ward_id: number;

  @ManyToOne(() => Ward, (ward) => ward.inventories)
  @JoinColumn({
    name: 'ward',
  })
  ward: Ward;

  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.inventory,
  )
  inventory_products: InventoryProduct[];

  @OneToMany(
    () => InventoryInputHistory,
    (inventoryInputHistory) => inventoryInputHistory.inventory,
  )
  input_histories: InventoryInputHistory[];

  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.inventory, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetails[];
}
