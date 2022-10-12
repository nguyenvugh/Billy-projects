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
import { TimestampWithoutSoftDelete } from '../../common/schemas/timestamp.schema';
import { InventoryInputHistory } from './inventory-input-history.schema';
import { Product } from '../../product/schemas/product.schema';

@Entity({
  name: 'inventory_input_history_details',
})
export class InventoryInputHistoryDetail extends TimestampWithoutSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'inventory_input_history',
  })
  @Index()
  input_history_id: number;

  @ManyToOne(
    () => InventoryInputHistory,
    (inventoryInputHistory) => inventoryInputHistory.details,
  )
  @JoinColumn({
    name: 'inventory_input_history',
  })
  input_history: InventoryInputHistory;

  @Column({
    type: 'int',
    unsigned: true,
  })
  number: number;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.inventory_input_details)
  @JoinColumn({
    name: 'product',
  })
  product: Product;
}
