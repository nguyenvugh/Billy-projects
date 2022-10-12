import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPaymentHistoryService } from './order-payment-history.service';
import { OrderPaymentHistoryController } from './order-payment-history.controller';
import { OrderPaymentHistoryRepository } from './repository/order-payment-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPaymentHistoryRepository])],
  controllers: [OrderPaymentHistoryController],
  providers: [OrderPaymentHistoryService],
})
export class OrderPaymentHistoryModule {}
