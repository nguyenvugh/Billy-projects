import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderPaymentService } from './order-payment.service';
import { OrderPaymentController } from './order-payment.controller';
import { OrderPaymentRepository } from './repository/order-payment.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { OnepayDriver } from './driver/onepay.driver';
import { CouponModule } from '../coupon/coupon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderPaymentRepository, ProductRepository]),
    ConfigModule,
    CouponModule,
  ],
  controllers: [OrderPaymentController],
  providers: [OrderPaymentService, OnepayDriver],
  exports: [OrderPaymentService],
})
export class OrderPaymentModule {}
