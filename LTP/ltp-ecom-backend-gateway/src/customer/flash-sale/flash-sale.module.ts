import { Module } from '@nestjs/common';
import { FlashSaleService } from './flash-sale.service';
import { FlashSaleController } from './flash-sale.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [FlashSaleController],
  providers: [FlashSaleService],
})
export class FlashSaleModule {}
