import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashSaleProductRepository } from 'src/flash-sale/repositories/flash-sale-product.repository';
import { FlashSaleRepository } from 'src/flash-sale/repositories/flash-sale.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { Product } from 'src/product/schemas/product.schema';
import { SliderRepository } from 'src/slider/repositories/slider.repository';
import { CharityController } from './charity.controller';
import { CharityService } from './charity.service';
import { CharityProductRepository } from './repositories/charity-product.repository';
import { CharityTranslateRepository } from './repositories/charity-translate.repository';
import { CharityRepository } from './repositories/charity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CharityRepository,
      CharityTranslateRepository,
      CharityProductRepository,
    ]),
    TypeOrmModule.forFeature([
      Product,
      ProductRepository,
      SliderRepository,
      FlashSaleRepository,
      FlashSaleProductRepository,
    ]),
    JwtCoreModule,
  ],
  controllers: [CharityController],
  providers: [CharityService]
})
export class CharityModule { }
