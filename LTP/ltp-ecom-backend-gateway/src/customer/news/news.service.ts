import { Injectable } from '@nestjs/common';
import { GetLatestNewsDto } from './dto/get-latest-news.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class NewsService {
  constructor(private microserviceService: MicroserviceService) {}

  async findAll(curLang: string) {
    return await this.microserviceService.call('customer-news-find-all', {
      lang: curLang,
    });
  }

  async findLatest(curLang: string) {
    return await this.microserviceService.call('customer-news-find-latest', {
      lang: curLang,
    });
  }

  async findOne(curLang: string, id: number) {
    return await this.microserviceService.call('customer-news-find-one', {
      lang: curLang,
      id,
    });
  }

  async findOneBySlug(curLang: string, slug: string) {
    return await this.microserviceService.call(
      'customer-news-find-one-by-slug',
      {
        lang: curLang,
        slug,
      },
    );
  }

  async findSlugOtherLang(curLang: string, reqData: FindSLugOtherLangDto) {
    return await this.microserviceService.call(
      'customer-news-find-slug-other-lang',
      {
        lang: curLang,
        slug: reqData.slug,
        otherLang: reqData.other_lang,
      },
    );
  }

  async getLatestNews(curLang: string, reqData: GetLatestNewsDto) {
    return await this.microserviceService.call(
      'customer-news-get-latests-news',
      {
        ...reqData,
        lang: curLang,
      },
    );
  }
}
