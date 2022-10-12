import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CurrentLang } from 'src/common/decorators/current-lang.decorator';
import { GetLatestNewsDto } from './dto/get-latest-news.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { ListNewsEntity } from './entities/list-news.entity';
import { NewsService } from './news.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/news`)
@ApiTags('Customer News')
@UseInterceptors(ClassSerializerInterceptor)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list news on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(@CurrentLang() curLang) {
    return await this.newsService.findAll(curLang);
  }

  @Get('/latest-news')
  @ApiOperation({ summary: 'Get list news latest on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async getLatestNews(
    @CurrentLang() curLang,
    @Query() reqData: GetLatestNewsDto,
  ) {
    return new ListNewsEntity(
      await this.newsService.getLatestNews(curLang, reqData),
    );
  }

  @Get('/latest')
  @ApiOperation({ summary: 'Get list news latest on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findLatest(@CurrentLang() curLang) {
    return await this.newsService.findLatest(curLang);
  }

  @Get('find-slug-other-lang')
  @ApiOperation({ summary: 'Get news slug in other lang' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findSlugOtherLang(
    @CurrentLang() curLang,
    @Query() reqData: FindSLugOtherLangDto,
  ) {
    return await this.newsService.findSlugOtherLang(curLang, reqData);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get news detail by slug on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOneBySlug(@CurrentLang() curLang, @Param('slug') slug: string) {
    return await this.newsService.findOneBySlug(curLang, slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news detail on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(@CurrentLang() curLang, @Param('id') id: number) {
    return await this.newsService.findOne(curLang, id);
  }
}
