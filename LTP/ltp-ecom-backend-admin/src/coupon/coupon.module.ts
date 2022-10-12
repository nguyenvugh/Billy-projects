import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { Product } from 'src/product/schemas/product.schema';
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
    JwtCoreModule,
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule { }
