import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSpecialProductService } from './customer-special-product.service';
import { CustomerSpecialProductController } from './customer-special-product.controller';
import { CustomerSpecialProductRepository } from './repository/customer-special-product.repository';
import { ProductRepository } from '../product/repository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerSpecialProductRepository,
      ProductRepository,
    ]),
  ],
  controllers: [CustomerSpecialProductController],
  providers: [CustomerSpecialProductService],
})
export class CustomerSpecialProductModule {}
