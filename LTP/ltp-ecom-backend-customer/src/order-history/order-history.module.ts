import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoryService } from './order-history.service';
import { OrderHistoryController } from './order-history.controller';
import { OrderHistoryRepository } from './repository/order-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistoryRepository])],
  controllers: [OrderHistoryController],
  providers: [OrderHistoryService],
})
export class OrderHistoryModule {}
