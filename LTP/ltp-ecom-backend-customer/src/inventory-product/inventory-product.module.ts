import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryProductService } from './inventory-product.service';
import { InventoryProductController } from './inventory-product.controller';
import { InventoryProductRepository } from './repository/inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryProductRepository])],
  controllers: [InventoryProductController],
  providers: [InventoryProductService],
})
export class InventoryProductModule {}
