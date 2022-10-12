import { Module } from '@nestjs/common';
import { OrderShippingService } from './order-shipping.service';
import { OrderShippingController } from './order-shipping.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [OrderShippingController],
  providers: [OrderShippingService],
})
export class OrderShippingModule {}
