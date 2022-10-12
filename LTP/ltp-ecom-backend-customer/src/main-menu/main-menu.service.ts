import { Injectable } from '@nestjs/common';
import { processTranslateData } from '../common/helpers/translate.helper';
import { NewsStatusConst } from '../common/constants/news.constant';
import { GetSubMenuDto } from './dto/get-sub-menu.dto';
import { ProductCategoryRepository } from '../product-category/repository/product-category.repository';
import { NewsRepository } from '../news/repositories/news.repository';
import { NewsCategoryRepository } from '../news-category/repositories/news-category.repository';

@Injectable()
export class MainMenuService {
  constructor(
    private productCategoryRepository: ProductCategoryRepository,
    private newsRepository: NewsRepository,
    private newsCategoryRepository: NewsCategoryRepository,
  ) {}

  async getSubmenuProducts(reqData: GetSubMenuDto) {
    const data = await this.productCategoryRepository
      .createQueryBuilder('product_category')
      .innerJoinAndSelect(
        'product_category.translates',
        'product_category_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .innerJoinAndSelect('product_category.childs', 'product_category_childs')
      .innerJoinAndSelect(
        'product_category_childs.translates',
        'product_category_childs_translates',
      )
      .orderBy({
        'product_category.order': 'ASC',
        'product_category_translates.language_value': 'ASC',
      })
      .take(4)
      .getMany();
    const results = data.map((item) => {
      const processedTranslate = processTranslateData(item['translates']);
      delete item['translates'];
      if (item.childs.length) {
        const newChilds: any[] = [];
        item.childs.forEach((child) => {
          const processedTranslate = processTranslateData(child['translates']);
          delete child['translates'];
          newChilds.push({
            ...child,
            ...processedTranslate[reqData.lang],
          });
        });
        item.childs = newChilds;
      }

      return {
        ...item,
        ...processedTranslate[reqData.lang],
      };
    });
    return { results };
  }

  async getSubmenuNews(reqData: GetSubMenuDto) {
    const data = await this.newsCategoryRepository
      .createQueryBuilder('news_categories')
      .innerJoinAndSelect(
        'news_categories.translates',
        'news_categories_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      /*
      .where('status = :status', {
        status: NewsStatusConst.PUBLISHED,
      })
      */
      .orderBy({
        'news_categories.created_at': 'DESC',
      })
      .take(4)
      .getMany();
    const results = data.map((item) => {
      const processedTranslate = processTranslateData(item['translates']);
      delete item['translates'];

      return {
        ...item,
        ...processedTranslate[reqData.lang],
      };
    });
    return { results };
  }
}
