import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NewsCategoryService } from './news-category.service';

@Controller('news-category')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @MessagePattern('customer-news-category-find-one')
  async findOne({ id, reqData }) {
    return await this.newsCategoryService.findOne('vi', id, reqData);
  }

  @MessagePattern('customer-news-category-find-one-by-slug')
  async findOneBySlug({ lang, slug, reqData }) {
    return await this.newsCategoryService.findOneBySlug(lang, slug, reqData);
  }

  @MessagePattern('customer-news-category-find-slug-other-lang')
  async findSlugOtherLang({ lang, slug, otherLang }) {
    return await this.newsCategoryService.findSlugOtherLang(
      lang,
      slug,
      otherLang,
    );
  }
}
