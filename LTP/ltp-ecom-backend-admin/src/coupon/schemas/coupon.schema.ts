import {
  CouponStatusConst,
  CouponTypeConst,
} from 'src/common/constants/coupon.constant';
import { TimestampWithSoftDelete } from 'src/common/schemas/timestamp.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CouponRequirement } from './coupon-requirement.schema';
import { CouponTranslate } from './coupon-translate.schema';

@Entity({
  name: 'coupons',
})
export class Coupon extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  limit: number;

  @Column({ type: 'varchar' })
  start_date: string;

  @Column({ type: 'varchar' })
  start_time: string;

  @Column({ type: 'varchar' })
  end_date: string;

  @Column({ type: 'varchar' })
  end_time: string;

  @Column({ type: 'tinyint', default: CouponTypeConst.ORDER })
  type: CouponTypeConst;

  @Column({
    type: 'tinyint',
    default: CouponStatusConst.INACTIVATED,
  })
  status: CouponStatusConst;

  @OneToMany(
    () => CouponTranslate,
    (couponTranslate) => couponTranslate.coupon_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  translates: CouponTranslate[];

  @OneToMany(
    () => CouponRequirement,
    (couponRequirement) => couponRequirement.coupon_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  requirements: CouponRequirement[];
}
