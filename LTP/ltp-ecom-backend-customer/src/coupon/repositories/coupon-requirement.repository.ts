import { EntityRepository, Repository } from 'typeorm';
import { CouponRequirement } from '../schemas/coupon-requirement.schema';

@EntityRepository(CouponRequirement)
export class CouponRequirementRepository extends Repository<CouponRequirement> { }
