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
import { ListPromotionsEntity } from './entities/list-promotions.entity';
import { PromotionService } from './promotion.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/promotions`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get(`/slider-home-page`)
  @ApiOperation({ summary: 'Get promotions slider on home page' })
  async getPromotionsSliderHomePage(@CurrentLang() curLang) {
    return new ListPromotionsEntity(
      await this.promotionService.getPromotionsSliderHomePage(curLang),
    );
  }
}
