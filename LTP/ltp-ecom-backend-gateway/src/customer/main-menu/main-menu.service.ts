import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class MainMenuService {
  constructor(private microserviceService: MicroserviceService) {}

  async getSubmenuProducts(curLang: string) {
    const result = await this.microserviceService.call(
      'customer-main-menu-get-sub-menu-products',
      {
        lang: curLang,
      },
    );

    return result;
  }

  async getSubmenuNews(curLang: string) {
    const result = await this.microserviceService.call(
      'customer-main-menu-get-sub-menu-news',
      {
        lang: curLang,
      },
    );

    return result;
  }
}
