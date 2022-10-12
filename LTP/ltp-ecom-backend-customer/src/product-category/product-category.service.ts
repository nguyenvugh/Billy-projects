import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { IsNull } from 'typeorm';
import { RpcExc } from '../common/exceptions/custom.exception';
import { processTranslateData } from '../common/helpers/translate.helper';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { FindAllProductCategoryDto } from './dto/find-all-product-cataegory.dto';
import { FindOneProductCategoryBySlugDto } from './dto/find-one-product-category-by-slug.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductCategorySlugHistoryRepository } from './repository/product-category-slug-history.repository';

@Injectable()
export class ProductCategoryService {
  constructor(
    private productCategoryRepository: ProductCategoryRepository,
    private productCategorySlugHistoryRepo: ProductCategorySlugHistoryRepository,
    private i18n: I18nService,
  ) {}

  create(createProductCategoryDto: CreateProductCategoryDto) {
    return 'This action adds a new productCategory';
  }

  async findAll(reqData: FindAllProductCategoryDto) {
    /*return await this.productCategoryRepository.find({
      where: {
        parent: IsNull(),
      },
      relations: ['childs', 'childs.translates', 'translates'],
    });*/
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const conditions: any = {
      parentId: reqData.parent ? reqData.parent : IsNull(),
    };
    if (reqData.is_feature) {
      conditions['is_feature'] = reqData.is_feature;
    }
    const data = await this.productCategoryRepository
      .createQueryBuilder('product_category')
      .leftJoinAndSelect('product_category.image', 'product_category_image')
      .leftJoinAndSelect(
        'product_category.translates',
        'product_category_translates',
      )
      .where(conditions)
      .andWhere('product_category_translates.language_code= :lang', {
        lang: reqData.lang,
      })
      .orderBy({
        'product_category_translates.language_value': 'ASC',
      })
      .skip(offset)
      .take(limit)
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

  async findOneBySlug(reqData: FindOneProductCategoryBySlugDto) {
    const { slug, lang } = reqData;
    const category = await this.productCategoryRepository
      .createQueryBuilder('product_category')
      .innerJoin('product_category.translates', 'product_category_translates')
      .where(
        'product_category_translates.language_field = :field AND product_category_translates.language_code = :lang AND product_category_translates.language_value = :slug',
        {
          field: 'slug',
          lang: lang,
          slug: slug,
        },
      )
      .getOne();
    if (!category) {
      const redirectSlug = await this.productCategorySlugHistoryRepo
        .createQueryBuilder('product_category_slug_history')
        .innerJoinAndSelect(
          'product_category_slug_history.product_category',
          'product_category_slug_history_product_category',
        )
        .innerJoinAndSelect(
          'product_category_slug_history_product_category.translates',
          'product_category_slug_history_product_category_translates',
          'product_category_slug_history_product_category_translates.language_code = :lang AND product_category_slug_history_product_category_translates.language_field = :field',
          {
            field: 'slug',
            lang: lang,
          },
        )
        .where(
          'product_category_slug_history.language_code = :lang AND product_category_slug_history.slug = :slug',
          {
            lang: lang,
            slug: slug,
          },
        )
        .getOne();
      if (!redirectSlug) {
        throw new RpcExc(`not_found:Not found`);
      } else {
        throw new RpcExc(
          `redirect:${redirectSlug.product_category.translates[0].language_value}`,
        );
      }
    }

    return category;
  }

  async findSlugOtherLang(lang = 'vi', slug: string, otherLang: string) {
    const category = await this.productCategoryRepository
      .createQueryBuilder('product_category')
      .innerJoinAndSelect(
        'product_category.translates',
        'product_category_translates_get',
        'product_category_translates_get.language_code = :other_lang AND product_category_translates_get.language_field = :field',
        {
          other_lang: otherLang,
          field: 'slug',
        },
      )
      .innerJoin('product_category.translates', 'product_category_translates')
      .where(
        'product_category_translates.language_field = :field AND product_category_translates.language_value = :slug',
        {
          field: 'slug',
          slug: slug,
        },
      )
      .getOne();
    if (!category) {
      throw new RpcExc(`not_found:Not found`);
    } else {
      return category.translates[0].language_value;
    }
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
