import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryProductRepo } from './repository/inventory-product.repository';
import { InventoryRepo } from './repository/inventory.repository';
import { ProductCategoryTranslateRepository } from '../product-category/repositories/product-category-translate.repository';
import { InventoryInputHistoryRepository } from '../inventory-input-history/repository/inventory-input-history.repository';
import { InventoryInputHistoryDetailRepository } from '../inventory-input-history/repository/inventory-input-history-detail.repository';
import { AdminRepository } from '../admin/repositories/admin.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { AuthModule } from 'src/auth/auth.module';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryRepo,
      InventoryProductRepo,
      ProductCategoryTranslateRepository,
      InventoryInputHistoryRepository,
      InventoryInputHistoryDetailRepository,
      AdminRepository,
      ProductRepository,
    ]),
    AuthModule,
    JwtCoreModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService, TypeOrmModule],
})
export class InventoryModule {}
