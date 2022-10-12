import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CurrentLang } from 'src/common/decorators/current-lang.decorator';
import { CharityService } from './charity.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/charity`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Charity')
export class CharityController {
  constructor(private readonly charityService: CharityService) { }

  @Get('home-page')
  @ApiOperation({ summary: 'Get charity on home page' })
  async getFlashSaleOnHomePage(@CurrentLang() curLang) {
    return await this.charityService.getCharityOnHomePage(curLang);
  }
}
