import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetSubMenuDto } from './dto/get-sub-menu.dto';
import { MainMenuService } from './main-menu.service';

@Controller('main-menu')
export class MainMenuController {
  constructor(private readonly mainMenuService: MainMenuService) {}

  @MessagePattern('customer-main-menu-get-sub-menu-products')
  async getSubmenuProducts(reqData: GetSubMenuDto) {
    return await this.mainMenuService.getSubmenuProducts(reqData);
  }

  @MessagePattern('customer-main-menu-get-sub-menu-news')
  async getSubmenuNews(reqData: GetSubMenuDto) {
    return await this.mainMenuService.getSubmenuNews(reqData);
  }
}
