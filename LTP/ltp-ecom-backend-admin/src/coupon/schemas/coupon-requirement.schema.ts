import { CouponRequirementTypeConst } from 'src/common/constants/coupon.constant';
import { Product } from 'src/product/schemas/product.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from './coupon.schema';

@Entity({
  name: 'coupon_requirements',
})
export class CouponRequirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  coupon: number;

  @ManyToOne(() => Coupon)
  @JoinColumn({
    name: 'coupon',
  })
  coupon_obj: Coupon;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'tinyint', default: CouponRequirementTypeConst.PRICE })
  type: CouponRequirementTypeConst;

  @Column({ type: 'int' })
  product: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product',
  })
  product_obj: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'tinyint' })
  percentage: number;
}
