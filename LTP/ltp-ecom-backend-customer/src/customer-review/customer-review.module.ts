import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerReviewService } from './customer-review.service';
import { CustomerReviewController } from './customer-review.controller';
import { CustomerReviewRepository } from './repository/customer-review.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderRepository } from '../order/repository/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerReviewRepository,
      ProductRepository,
      OrderRepository,
    ]),
  ],
  controllers: [CustomerReviewController],
  providers: [CustomerReviewService],
})
export class CustomerReviewModule {}
