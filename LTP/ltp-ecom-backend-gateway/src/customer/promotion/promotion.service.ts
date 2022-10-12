import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class PromotionService {
  constructor(private microserviceService: MicroserviceService) {}

  async getPromotionsSliderHomePage(curLang: string) {
    const result = await this.microserviceService.call(
      'customer-promotion-get-promotions-slider-home-page',
      {
        lang: curLang,
      },
    );

    return result;
  }
}
