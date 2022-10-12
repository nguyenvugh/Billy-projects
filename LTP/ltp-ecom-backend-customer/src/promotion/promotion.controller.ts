import { Controller } from '@nestjs/common';
import { GetPromotionsSliderHomePageDto } from './dto/get-promotions-slider-home-page.dto';
import { MessagePattern } from '@nestjs/microservices';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @MessagePattern('customer-promotion-get-promotions-slider-home-page')
  async findAll(reqData: GetPromotionsSliderHomePageDto) {
    return await this.promotionService.getPromotionsSliderHomePage(reqData);
  }
}
