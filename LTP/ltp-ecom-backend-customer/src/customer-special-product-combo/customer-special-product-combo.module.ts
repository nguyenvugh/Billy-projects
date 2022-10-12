import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSpecialProductComboService } from './customer-special-product-combo.service';
import { CustomerSpecialProductComboController } from './customer-special-product-combo.controller';
import { CustomerSpecialProductComboRepository } from './repository/customer-special-product.repository';
import { ProductComboRepository } from '../product-combo/repository/product-combo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerSpecialProductComboRepository,
      ProductComboRepository,
    ]),
  ],
  controllers: [CustomerSpecialProductComboController],
  providers: [CustomerSpecialProductComboService],
})
export class CustomerSpecialProductComboModule {}
