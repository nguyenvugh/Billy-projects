import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
