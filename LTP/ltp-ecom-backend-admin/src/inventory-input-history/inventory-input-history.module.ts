import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryInputHistoryService } from './inventory-input-history.service';
import { InventoryInputHistoryController } from './inventory-input-history.controller';
import { InventoryInputHistoryRepository } from './repository/inventory-input-history.repository';
import { InventoryInputHistoryDetailRepository } from './repository/inventory-input-history-detail.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryInputHistoryRepository,
      InventoryInputHistoryDetailRepository,
    ]),
  ],
  controllers: [InventoryInputHistoryController],
  providers: [InventoryInputHistoryService],
})
export class InventoryInputHistoryModule {}
