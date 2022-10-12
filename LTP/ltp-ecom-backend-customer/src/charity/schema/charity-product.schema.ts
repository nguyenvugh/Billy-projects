import { Product } from 'src/product/schema/product.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Charity } from './charity.schema';

@Entity({
  name: 'charity_products',
})
export class CharityProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  charity: number;

  @ManyToOne(() => Charity, (charity) => charity.products)
  @JoinColumn({
    name: 'charity',
  })
  charity_obj: Charity;

  @Column({ type: 'int' })
  product: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product',
  })
  product_obj: Product;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'tinyint' })
  percentage: number;

  @Column({ type: 'int' })
  charity_price: number;

  @Column({ type: 'bigint' })
  total: number;

  @Column({ type: 'bigint' })
  sold: number;
}
