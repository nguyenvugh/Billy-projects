import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class CharityService {
  constructor(private microserviceService: MicroserviceService) { }

  async getCharityOnHomePage(curLang: string) {
    const result = await this.microserviceService.call(
      'customer-charity-get-charity-home-page',
      {
        lang: curLang,
      },
    );
    return result;
  }
}
