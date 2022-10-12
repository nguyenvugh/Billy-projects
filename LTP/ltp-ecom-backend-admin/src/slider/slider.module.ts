import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharityProductRepository } from 'src/charity/repositories/charity-product.repository';
import { CharityRepository } from 'src/charity/repositories/charity.repository';
import { FlashSaleProductRepository } from 'src/flash-sale/repositories/flash-sale-product.repository';
import { FlashSaleRepository } from 'src/flash-sale/repositories/flash-sale.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { Product } from 'src/product/schemas/product.schema';
import { SliderTranslateRepository } from './repositories/slider-translate.repository';
import { SliderRepository } from './repositories/slider.repository';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SliderRepository,
      SliderTranslateRepository,
      ProductRepository,
    ]),
    TypeOrmModule.forFeature([
      Product,
      FlashSaleRepository,
      FlashSaleProductRepository,
      CharityRepository,
      CharityProductRepository,
    ]),
    JwtCoreModule,
  ],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule { }
