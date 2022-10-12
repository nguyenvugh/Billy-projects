import { Injectable } from '@nestjs/common';
import { FindAllShopsDto } from './dto/find-all-shops.dto';
import { ShopRepository } from './repository/shop.repository';

@Injectable()
export class ShopService {
  constructor(private shopRepo: ShopRepository) {}

  async findAllShops(reqData: FindAllShopsDto) {
    const conditions: any = {};
    if (reqData.city_id) {
      conditions['city_id'] = reqData.city_id;
    }
    if (reqData.district_id) {
      conditions['district_id'] = reqData.district_id;
    }
    const results = await this.shopRepo.find({
      where: conditions,
      relations: ['thumbnail', 'ward', 'district', 'city'],
    });

    return { results };
  }
}
