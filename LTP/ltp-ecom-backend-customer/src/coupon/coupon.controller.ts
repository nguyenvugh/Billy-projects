import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AuthGuard } from 'src/common/guards/auth.guard';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create.dto';
import { FindCouponByCriteriaDto } from './dto/find-by-criteria.dto';
import { UpdateCouponDto } from './dto/update.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @MessagePattern('customer-coupon-find-all')
  async findByCriteria(data: FindCouponByCriteriaDto) {
    return await this.couponService.findByCriteria(data);
  }
}
