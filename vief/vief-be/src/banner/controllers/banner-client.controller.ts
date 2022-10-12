import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangEnum } from '../../common/constants/global.constant';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { GetAllBannerDto } from '../dto/req/get-all-banner.dto';
import { ResGetListBanner } from '../dto/res/get-list-banner.dto';

@ApiTags('Client Banners')
@Controller('client/banners')
export class CategoryByClientController {
  @Get()
  @ManualSerialize(ResGetListBanner)
  async getAll(
    @Query() banner: GetAllBannerDto,
    @Headers('lang') lang: LangEnum,
  ) {
    return {
      data: [],
      total: 0,
    };
  }
}
