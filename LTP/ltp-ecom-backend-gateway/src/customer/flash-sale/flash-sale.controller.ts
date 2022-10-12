import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { FlashSaleHomePageEntity } from './entities/flash-sale-home-page.entity';
import { FlashSaleService } from './flash-sale.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/flash-sale`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Flash Sale')
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @Get('home-page')
  @ApiOperation({ summary: 'Get flash sale on home page' })
  async getFlashSaleOnHomePage(@CurrentLang() curLang) {
    return new FlashSaleHomePageEntity(
      await this.flashSaleService.getFlashSaleOnHomePage(curLang),
    );
  }
}
