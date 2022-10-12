import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductComboService } from './product-combo.service';
import { ProductComboController } from './product-combo.controller';
import { ProductComboRepository } from './repository/product-combo.repository';
import { ProductComboDetailRepository } from './repository/product-combo-detail.repository';
import { ProductComboTranslateRepository } from './repository/product-combo-translate.repository';
import { CustomerSpecialProductRepository } from '../customer-special-product/repository/customer-special-product.repository';
import { CustomerSpecialProductComboRepository } from '../customer-special-product-combo/repository/customer-special-product.repository';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductComboRepository,
      ProductComboDetailRepository,
      ProductComboTranslateRepository,
      CustomerSpecialProductRepository,
      CustomerSpecialProductComboRepository,
    ]),
    OrderModule,
  ],
  controllers: [ProductComboController],
  providers: [ProductComboService],
})
export class ProductComboModule {}
