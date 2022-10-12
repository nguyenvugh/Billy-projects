import { EntityRepository, Repository } from 'typeorm';
import { CouponTranslate } from '../schemas/coupon-translate.schema';

@EntityRepository(CouponTranslate)
export class CouponTranslateRepository extends Repository<CouponTranslate> { }
