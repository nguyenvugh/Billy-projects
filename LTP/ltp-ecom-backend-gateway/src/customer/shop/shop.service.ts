import { Injectable } from '@nestjs/common';
import { FindAllShopsDto } from './dto/find-all-shops.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class ShopService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAllShops(curLang: string, reqData: FindAllShopsDto) {
    const finalReqData: any = {
      ...reqData,
      lang: curLang,
    };
    const result = await this.microserviceService.call(
      'customer-shop-find-all-shops',
      finalReqData,
    );

    return result;
  }
}
