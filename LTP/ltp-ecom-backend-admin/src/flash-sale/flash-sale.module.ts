import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharityProductRepository } from 'src/charity/repositories/charity-product.repository';
import { CharityRepository } from 'src/charity/repositories/charity.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { Product } from 'src/product/schemas/product.schema';
import { SliderRepository } from 'src/slider/repositories/slider.repository';
import { FlashSaleController } from './flash-sale.controller';
import { FlashSaleService } from './flash-sale.service';
import { FlashSaleProductRepository } from './repositories/flash-sale-product.repository';
import { FlashSaleRepository } from './repositories/flash-sale.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlashSaleRepository, FlashSaleProductRepository]),
    TypeOrmModule.forFeature([
      Product,
      ProductRepository,
      SliderRepository,
      CharityRepository,
      CharityProductRepository,
    ]),
    JwtCoreModule,
  ],
  controllers: [FlashSaleController],
  providers: [FlashSaleService],
})
export class FlashSaleModule { }
