import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class FlashSaleService {
  constructor(private microserviceService: MicroserviceService) {}

  async getFlashSaleOnHomePage(curLang: string) {
    const result = await this.microserviceService.call(
      'customer-flash-sale-get-flash-sale-home-page',
      {
        lang: curLang,
      },
    );
    return result;
  }
}
