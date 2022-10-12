import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  imports: [MicroserviceModule],
  providers: [OrdersService],
})
export class OrdersModule {}
