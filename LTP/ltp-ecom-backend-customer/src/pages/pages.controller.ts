import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @MessagePattern('customer-pages-find-by-slug')
  async findBySlug({ lang, slug }) {
    return await this.pagesService.findBySlug(lang, slug);
  }

  @MessagePattern('customer-get-company-information')
  async getCompanyInformation({ lang }) {
    const result = await this.pagesService.getCompanyInformation(lang);
    return result;
  }

  @MessagePattern('customer-pages-find-slug-other-lang')
  async findSlugOtherLang({ lang, slug, otherLang }) {
    return await this.pagesService.findSlugOtherLang(lang, slug, otherLang);
  }
}
