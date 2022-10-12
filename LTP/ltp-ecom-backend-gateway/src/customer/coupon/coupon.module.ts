import { Module } from '@nestjs/common';
import { CustomerCouponService } from './coupon.service';
import { CustomerCouponController } from './coupon.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [CustomerCouponController],
  providers: [CustomerCouponService],
})
export class CustomerCouponModule {}
