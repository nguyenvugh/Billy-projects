import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashSaleService } from './flash-sale.service';
import { FlashSaleController } from './flash-sale.controller';
import { FlashSaleRepository } from './repository/flash-sale.repository';
import { FlashSaleProductRepository } from './repository/flash-sale-product.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { FlashSaleSubscriber } from './subscriber/flash-sale.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FlashSaleRepository,
      FlashSaleProductRepository,
      ProductRepository,
    ]),
  ],
  controllers: [FlashSaleController],
  providers: [FlashSaleService, FlashSaleSubscriber],
  exports: [FlashSaleService],
})
export class FlashSaleModule {}
