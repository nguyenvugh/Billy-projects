import { Injectable } from '@nestjs/common';
import { CustomerFindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class ProductComboService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAllProductCombos(
    curLang: string,
    reqData: CustomerFindAllProductCombosDto,
    customer: number,
  ) {
    const finalReqData: any = {
      ...reqData,
      lang: curLang,
    };
    if (customer) {
      finalReqData['customer'] = customer;
    }
    return await this.microserviceService.call(
      'customer-product-combo-find-all-product-combos',
      finalReqData,
    );
  }

  async findOneProductCombo(id: number, curLang: string, customer: number) {
    const finalReqData: any = {
      id,
      lang: curLang,
    };
    if (customer) {
      finalReqData['customer'] = customer;
    }
    const result = await this.microserviceService.call(
      'customer-product-combo-find-one-product-combo',
      finalReqData,
    );

    return result;
  }
}
