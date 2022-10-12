import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { CurrentLang } from 'src/common/decorators/current-lang.decorator';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { ListProductCategoriesEntity } from './entities/list.entity';
import { ListNewsCategoriesEntity } from './entities/list-news-categories.entity';
import { MainMenuService } from './main-menu.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/main-menu`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Main Menu')
export class MainMenuController {
  constructor(private readonly mainMenuService: MainMenuService) {}

  @Get(`/products`)
  @ApiOperation({ summary: 'Get submenu of Products' })
  async getSubmenuProducts(@CurrentLang() curLang) {
    return new ListProductCategoriesEntity(
      await this.mainMenuService.getSubmenuProducts(curLang),
    );
  }

  @Get(`/news`)
  @ApiOperation({ summary: 'Get submenu of News' })
  async getSubmenuNews(@CurrentLang() curLang) {
    return new ListNewsCategoriesEntity(
      await this.mainMenuService.getSubmenuNews(curLang),
    );
  }
}
