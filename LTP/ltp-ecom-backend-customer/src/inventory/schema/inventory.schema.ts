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
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Country } from '../../country/schema/country.schema';
import { City } from '../../city/schema/city.schema';
import { District } from '../../district/schema/district.schema';
import { Ward } from '../../ward/schema/ward.schema';
import { Product } from '../../product/schema/product.schema';
import { OrderDetail } from '../../order-detail/schema/order-detail.schema';
import { InventoryProduct } from '../../inventory-product/schema/inventory-product.schema';

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
  countryId: number;

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
  cityId: number;

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
  districtId: number;

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
  wardId: number;

  @ManyToOne(() => Ward, (ward) => ward.inventories)
  @JoinColumn({
    name: 'ward',
  })
  ward: Ward;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'inventory_products',
    joinColumn: {
      name: 'inventory',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.inventory, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_details: OrderDetail[];

  @OneToMany(
    () => InventoryProduct,
    (inventoryProduct) => inventoryProduct.inventory,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  inventory_products: InventoryProduct[];
}
