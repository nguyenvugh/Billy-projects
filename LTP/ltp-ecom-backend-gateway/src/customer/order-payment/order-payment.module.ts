import { Module } from '@nestjs/common';
import { OrderPaymentService } from './order-payment.service';
import { OrderPaymentController } from './order-payment.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [OrderPaymentController],
  providers: [OrderPaymentService],
})
export class OrderPaymentModule {}
