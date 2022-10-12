import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CurrentLang } from 'src/common/decorators/current-lang.decorator';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { PagesService } from './pages.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/pages`)
@ApiTags('Customer Pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('find-slug-other-lang')
  @ApiOperation({ summary: 'Get news category slug in other lang' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findSlugOtherLang(
    @CurrentLang() curLang,
    @Query() reqData: FindSLugOtherLangDto,
  ) {
    return await this.pagesService.findSlugOtherLang(curLang, reqData);
  }

  @Get('get-company-information')
  @ApiOperation({ summary: 'Get company information on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async getCompanyInformation(@CurrentLang() curLang) {
    return await this.pagesService.getCompanyInformation(curLang);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get page detail on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(@CurrentLang() curLang, @Param('slug') slug: string) {
    return await this.pagesService.findBySlug(curLang, slug);
  }
}
