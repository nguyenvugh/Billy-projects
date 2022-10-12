import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { FlashSaleController } from './flash-sale.controller';
import { FlashSaleService } from './flash-sale.service';

@Module({
  controllers: [FlashSaleController],
  providers: [FlashSaleService],
  imports: [MicroserviceModule],
})
export class FlashSaleModule { }
