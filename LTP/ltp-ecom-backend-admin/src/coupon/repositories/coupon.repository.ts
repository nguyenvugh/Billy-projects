import { EntityRepository, Repository } from 'typeorm';
import { Coupon } from '../schemas/coupon.schema';

@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> { }
