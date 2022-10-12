import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CustomerFindAllProductCategoryDto } from './dto/find-all-product-cataegory.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class ProductCategoryService {
  constructor(
    private microserviceService: MicroserviceService,
    private i18n: I18nService,
  ) {}

  create(createProductCategoryDto: CreateProductCategoryDto) {
    return 'This action adds a new productCategory';
  }

  async findAll(curLang: string, reqData: CustomerFindAllProductCategoryDto) {
    const result = await this.microserviceService.call(
      'customer-product-category-find-all',
      {
        ...reqData,
        lang: curLang,
      },
    );

    return result;
  }

  async findOneBySlug(curLang: string, slug: string) {
    const result = await this.microserviceService.call(
      'customer-product-category-find-one-by-slug',
      {
        slug,
        lang: curLang,
      },
    );

    return result;
  }

  async findSlugOtherLang(curLang: string, reqData: FindSLugOtherLangDto) {
    return await this.microserviceService.call(
      'customer-product-category-find-slug-other-lang',
      {
        lang: curLang,
        slug: reqData.slug,
        otherLang: reqData.other_lang,
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} productCategory`;
  }

  update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    return `This action updates a #${id} productCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}
