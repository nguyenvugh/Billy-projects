import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [MicroserviceModule],
})
export class CouponModule { }
