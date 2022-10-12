import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../product/repository/product.repository';
import { Product } from '../product/schema/product.schema';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponRequirementRepository } from './repositories/coupon-requirement.repository';
import { CouponTranslateRepository } from './repositories/coupon-translate.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CouponRepository,
      CouponTranslateRepository,
      CouponRequirementRepository,
    ]),
    TypeOrmModule.forFeature([Product, ProductRepository]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
