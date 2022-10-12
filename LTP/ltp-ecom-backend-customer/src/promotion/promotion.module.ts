import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { SliderRepository } from './repository/slider.repository';
import { SliderTranslateRepository } from './repository/slider-translate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SliderRepository, SliderTranslateRepository]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
