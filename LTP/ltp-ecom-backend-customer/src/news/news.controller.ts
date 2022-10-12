import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetLatestNewsDto } from './dto/get-latest-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @MessagePattern('customer-news-find-all')
  async findAll() {
    return await this.newsService.findAll();
  }

  @MessagePattern('customer-news-find-latest')
  async findLatest() {
    return await this.newsService.findLatest();
  }

  @MessagePattern('customer-news-find-one')
  async findOne({ id }) {
    return await this.newsService.findOne('vi', id);
  }

  @MessagePattern('customer-news-find-one-by-slug')
  async findOneBySlug({ lang, slug }) {
    return await this.newsService.findOneBySlug(lang, slug);
  }

  @MessagePattern('customer-news-find-slug-other-lang')
  async findSlugOtherLang({ lang, slug, otherLang }) {
    return await this.newsService.findSlugOtherLang(lang, slug, otherLang);
  }

  @MessagePattern('customer-news-get-latests-news')
  async getLatestNews(reqData: GetLatestNewsDto) {
    return await this.newsService.getLatestNews(reqData);
  }
}
