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
import { District } from '../../district/schemas/district.schema';
import { OrderShippings } from '../../orders/schemas/order-shippings.schema';
import { Inventory } from '../../inventory/schemas/inventory.schema';

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

  @OneToMany(() => OrderShippings, (orderShipping) => orderShipping.ward, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  order_shippings: OrderShippings[];

  @OneToMany(() => Inventory, (inventory) => inventory.ward, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  inventories: Inventory[];
}
