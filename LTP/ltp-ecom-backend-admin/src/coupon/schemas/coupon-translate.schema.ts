import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { Coupon } from './coupon.schema';

@Entity({
  name: 'coupon_translates',
})
export class CouponTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'coupon', type: 'int' })
  coupon: number;

  @ManyToOne(() => Coupon, (coupon) => coupon.translates)
  @Index()
  @JoinColumn([
    {
      name: 'coupon',
      referencedColumnName: 'id',
    },
  ])
  coupon_obj: Coupon;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
