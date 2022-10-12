import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangEnum } from '../../common/constants/global.constant';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { ArticleService } from '../article.service';
import { GetListArticleByClientDto } from '../dto/req/client/get-list-article.dto';
import { ResGetArticleBySlug } from '../dto/res/client/get-article-by-slug.dto';
import { ResGetListArticleByClient } from '../dto/res/client/get-list-article.dto';

@Controller('client/article')
@ApiTags('Article client')
export class ArticleByClientController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  @ManualSerialize(ResGetListArticleByClient)
  async getListArticles(
    @Query() getListArticle: GetListArticleByClientDto,
    @Headers('lang') lang: LangEnum,
  ) {
    return this.articleService.getListArticleByClient(getListArticle, lang);
  }

  @Get(':slug')
  @ManualSerialize(ResGetArticleBySlug)
  async getArticleById(
    @Param('slug') slug: string,
    @Headers('lang') lang: LangEnum,
  ) {
    return this.articleService.getArticleBySlug(slug, lang);
  }
}
