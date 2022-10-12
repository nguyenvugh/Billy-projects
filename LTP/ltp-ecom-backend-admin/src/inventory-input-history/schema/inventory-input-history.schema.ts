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
  OneToOne,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { Inventory } from '../../inventory/schemas/inventory.schema';
import { InventoryInputHistoryDetail } from './inventory-input-history-detail.schema';
import { Admin } from '../../admin/schemas/admin.schema';

@Entity({
  name: 'inventory_input_histories',
})
@Index(['code', 'deleted_at'], { unique: true })
export class InventoryInputHistory extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  code: string;

  @Column({
    type: 'int',
    name: 'inventory',
  })
  @Index()
  inventory_id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.input_histories)
  @JoinColumn({
    name: 'inventory',
  })
  inventory: Inventory;

  @Column({
    type: 'int',
    name: 'created_by',
  })
  @Index()
  created_by_id: number;

  @ManyToOne(() => Admin, (admin) => admin.inventory_input_histories_create)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: Admin;

  @Column({
    type: 'int',
    name: 'updated_by',
  })
  @Index()
  updated_by_id: number;

  @ManyToOne(() => Admin, (admin) => admin.inventory_input_histories_update)
  @JoinColumn({
    name: 'created_by',
  })
  updated_by: Admin;

  @OneToMany(
    () => InventoryInputHistoryDetail,
    (inventoryInputHistoryDetail) => inventoryInputHistoryDetail.input_history,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  details: InventoryInputHistoryDetail[];
}
