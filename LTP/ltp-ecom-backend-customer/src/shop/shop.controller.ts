import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllShopsDto } from './dto/find-all-shops.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @MessagePattern('customer-shop-find-all-shops')
  async findAllShops(reqData: FindAllShopsDto) {
    return await this.shopService.findAllShops(reqData);
  }
}
