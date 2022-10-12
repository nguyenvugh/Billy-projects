import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductComboService } from './product-combo.service';
import { ProductComboController } from './product-combo.controller';
import { ProductComboRepository } from './repository/product-combo.repository';
import { ProductComboDetailRepository } from './repository/product-combo-detail.repository';
import { ProductComboImageRepository } from './repository/product-combo-image.repository';
import { ProductComboTranslateRepository } from './repository/product-combo-translate.repository';
import { ProductTranslateRepo } from '../product/repositories/product-translate.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { OrderDetailsRepository } from '../orders/repositories/order-details.repository';
import { CharityProductRepository } from '../charity/repositories/charity-product.repository';
import { FlashSaleProductRepository } from '../flash-sale/repositories/flash-sale-product.repository';
import { SliderRepository } from '../slider/repositories/slider.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductComboRepository,
      ProductComboDetailRepository,
      ProductComboImageRepository,
      ProductComboTranslateRepository,
      ProductTranslateRepo,
      ProductRepository,
      OrderDetailsRepository,
      CharityProductRepository,
      FlashSaleProductRepository,
      SliderRepository,
    ]),
    JwtCoreModule,
    AuthModule,
  ],
  controllers: [ProductComboController],
  providers: [ProductComboService],
})
export class ProductComboModule {}
