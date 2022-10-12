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
import { Product } from '../../product/schema/product.schema';
import { Inventory } from '../../inventory/schema/inventory.schema';

@Entity({
  name: 'inventory_products',
})
@Index(['product', 'inventory'], { unique: true })
export class InventoryProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'product',
  })
  @Index()
  product_id: number;

  @ManyToOne(() => Product, (product) => product.inventory_products)
  @JoinColumn({
    name: 'product',
  })
  product: Product;

  @Column({
    type: 'int',
    name: 'inventory',
  })
  @Index()
  inventory_id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.inventory_products)
  @JoinColumn({
    name: 'inventory',
  })
  inventory: Inventory;

  @Column({
    type: 'int',
    //unsigned: true,
    default: 0,
  })
  remaining_number: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
  })
  sold_number: number;
}
