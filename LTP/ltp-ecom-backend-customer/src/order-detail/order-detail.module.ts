import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailRepository } from './repository/order-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailRepository])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
