import { Injectable } from '@nestjs/common';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class PagesService {
  constructor(private microserviceService: MicroserviceService) {}

  async findBySlug(curLang: string, slug: string) {
    return await this.microserviceService.call('customer-pages-find-by-slug', {
      lang: curLang,
      slug,
    });
  }

  async getCompanyInformation(curLang: string) {
    return await this.microserviceService.call(
      'customer-get-company-information',
      {
        lang: curLang,
      },
    );
  }

  async findSlugOtherLang(curLang: string, reqData: FindSLugOtherLangDto) {
    return await this.microserviceService.call(
      'customer-pages-find-slug-other-lang',
      {
        lang: curLang,
        slug: reqData.slug,
        otherLang: reqData.other_lang,
      },
    );
  }
}
