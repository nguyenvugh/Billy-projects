import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetFlashSaleHomePageDto } from './dto/get-flash-sale-home-page.dto';
import { FlashSaleService } from './flash-sale.service';

@Controller('flash-sale')
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @MessagePattern('customer-flash-sale-get-flash-sale-home-page')
  async getFlashSaleOnHomePage(reqData: GetFlashSaleHomePageDto) {
    return await this.flashSaleService.getFlashSaleOnHomePage(reqData);
  }
}
