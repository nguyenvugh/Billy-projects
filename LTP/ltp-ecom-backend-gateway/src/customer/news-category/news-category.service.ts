import { Injectable } from '@nestjs/common';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class NewsCategoryService {
  constructor(private microserviceService: MicroserviceService) {}

  async findOne(curLang: string, id: number, reqData) {
    return await this.microserviceService.call(
      'customer-news-category-find-one',
      {
        lang: curLang,
        id,
        reqData,
      },
    );
  }

  async findOneBySlug(curLang: string, slug: string, reqData) {
    return await this.microserviceService.call(
      'customer-news-category-find-one-by-slug',
      {
        lang: curLang,
        slug,
        reqData,
      },
    );
  }

  async findSlugOtherLang(curLang: string, reqData: FindSLugOtherLangDto) {
    return await this.microserviceService.call(
      'customer-news-category-find-slug-other-lang',
      {
        lang: curLang,
        slug: reqData.slug,
        otherLang: reqData.other_lang,
      },
    );
  }
}
