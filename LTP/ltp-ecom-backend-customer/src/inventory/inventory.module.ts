import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './repository/inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryRepository])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
