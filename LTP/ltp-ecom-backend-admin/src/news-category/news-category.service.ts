import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import { SlugService } from '../common/services/slug.service';
import { convertVietnameseCharsToEnglishChars } from '../common/helpers/util.helper';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { NewsCategoryTranslateRepository } from './repositories/news-category-translate.repository';
import { NewsCategorySlugHistoryRepository } from './repositories/news-category-slug-history.repository';
import { NewsCategoryRepository } from './repositories/news-category.repository';

@Injectable()
export class NewsCategoryService {
  constructor(
    private readonly newsCategoryRepository: NewsCategoryRepository,
    private readonly newsCategoryTranslateRepository: NewsCategoryTranslateRepository,
    private newsCategorySlugHistoryRepo: NewsCategorySlugHistoryRepository,
    private slugService: SlugService,
  ) {}

  async initSlugData() {
    const newsCategoryNamesData =
      await this.newsCategoryTranslateRepository.find({
        where: {
          language_field: 'name',
        },
        order: {
          id: 'ASC',
        },
      });
    const groupNewsCategoryBySlugs: any = {};
    if (newsCategoryNamesData.length) {
      newsCategoryNamesData.forEach((item) => {
        const newsCategorySlug = this.slugService.slug(item.language_value);
        if (
          false == groupNewsCategoryBySlugs.hasOwnProperty(newsCategorySlug)
        ) {
          groupNewsCategoryBySlugs[newsCategorySlug] = [];
        }
        groupNewsCategoryBySlugs[newsCategorySlug].push({
          news_category_id: item.news_category,
          language_code: item.language_code,
        });
      });
    }
    const dataInitSlug: any[] = [];
    for (const newsCategorySlug in groupNewsCategoryBySlugs) {
      if (true == groupNewsCategoryBySlugs.hasOwnProperty(newsCategorySlug)) {
        const newsCategoryItems = groupNewsCategoryBySlugs[newsCategorySlug];
        for (let index = 0; index < newsCategoryItems.length; index++) {
          const newsCategoryItem = newsCategoryItems[index];
          dataInitSlug.push({
            news_category: newsCategoryItem.news_category_id,
            language_code: newsCategoryItem.language_code,
            language_field: 'slug',
            language_value:
              0 == index
                ? newsCategorySlug
                : `${newsCategorySlug}-${index + 1}`,
          });
        }
      }
    }
    await this.newsCategoryTranslateRepository.delete({
      language_field: 'slug',
    });
    await this.newsCategoryTranslateRepository.save(dataInitSlug);

    return 'success';
  }

  async findAll(): Promise<any> {
    return await this.newsCategoryRepository.find({
      relations: ['translates'],
    });
  }

  async create(data: CreateNewsCategoryDto): Promise<any> {
    try {
      let newContentsTranslate =
        await this.generateContentsTranslateIncludeSlugs(data.contents);
      if (!newContentsTranslate.length) {
        return {
          code: 500,
          message: 'Can not create news category',
        };
      }
      const categoryCreated = await this.newsCategoryRepository.save({
        order: 0,
      });
      if (!categoryCreated) {
        return {
          code: 500,
          message: 'Can not create news category',
        };
      }
      newContentsTranslate = newContentsTranslate.map((item) => {
        return {
          ...item,
          news_category: categoryCreated['id'],
        };
      });
      await this.newsCategoryTranslateRepository.save(newContentsTranslate);
      return {
        code: 200,
        data: categoryCreated,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Can not create news category',
      };
    }
  }

  async update(id: number, data: CreateNewsCategoryDto): Promise<any> {
    const category = await this.newsCategoryRepository
      .createQueryBuilder('news_category')
      .innerJoinAndSelect(
        'news_category.translates',
        'news_category_translates',
      )
      .where({
        id: id,
      })
      .getOne();
    if (category) {
      const oldSlug: any = {};
      category.translates.forEach((translate) => {
        if ('slug' == translate.language_field) {
          oldSlug[translate.language_code] = translate.language_value;
        }
      });
      let newContentsTranslate =
        await this.generateContentsTranslateIncludeSlugs(data.contents, id);
      if (!newContentsTranslate.length) {
        return {
          code: 500,
          message: 'Can not update news category',
        };
      }
      const dataSaveSlugHistories: any[] = [];
      newContentsTranslate = newContentsTranslate.map((item) => {
        if ('slug' == item.language_field) {
          if (true == oldSlug.hasOwnProperty(item.language_code)) {
            if (oldSlug[item.language_code] != item.language_value) {
              dataSaveSlugHistories.push({
                news_category_id: id,
                language_code: item.language_code,
                slug: oldSlug[item.language_code],
              });
            }
          }
        }

        return {
          ...item,
          news_category: id,
        };
      });
      await this.newsCategoryTranslateRepository.delete({
        news_category: id,
      });
      await Promise.all([
        this.newsCategoryTranslateRepository.save(newContentsTranslate),
        this.newsCategorySlugHistoryRepo.save(dataSaveSlugHistories),
      ]);
      return {
        code: 200,
        message: 'Update category successfully',
      };
    } else {
      return {
        code: 404,
        message: 'Category not found',
      };
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const categories = await this.newsCategoryRepository.findByIds(idsArr);
    if (categories && categories.length > 0) {
      categories.map(async (category) => {
        category.deleted_at = new Date();
        category.deleted = DeletedConst.DELETED;
        await this.newsCategoryRepository.save(category);
      });
      return {
        code: 200,
        message: 'Selected categories deleted successfully',
      };
    } else {
      return {
        code: 404,
        message: 'Category not found',
      };
    }
  }

  private async generateContentsTranslateIncludeSlugs(
    contentsTranslate: any[],
    idNewsUpdating = 0,
  ) {
    const newsCategoryTranslateDataByLanguageCode: any = {};
    const newContentTranslate: any[] = [];
    contentsTranslate.forEach((item) => {
      if (
        false ==
        newsCategoryTranslateDataByLanguageCode.hasOwnProperty(
          item.language_code,
        )
      ) {
        newsCategoryTranslateDataByLanguageCode[item.language_code] = {
          name: '',
          slug: '',
        };
      }
      if ('name' == item.language_field) {
        newsCategoryTranslateDataByLanguageCode[item.language_code]['name'] =
          item.language_value;
      }
      if ('slug' == item.language_field) {
        newsCategoryTranslateDataByLanguageCode[item.language_code]['slug'] =
          item.language_value;
      }
      if ('slug' != item.language_field) {
        newContentTranslate.push(item);
      }
    });
    const objectSlugs: any = {};
    for (const langCode in newsCategoryTranslateDataByLanguageCode) {
      if (
        true == newsCategoryTranslateDataByLanguageCode.hasOwnProperty(langCode)
      ) {
        const newsCategoryTranslateData =
          newsCategoryTranslateDataByLanguageCode[langCode];
        const newsSlug = await this.generateSlug(
          newsCategoryTranslateData['name'],
          langCode,
          newsCategoryTranslateData['slug'],
          idNewsUpdating,
        );
        if (!newsSlug) {
          return [];
        }
        // Check duplicate slug
        if (true == objectSlugs.hasOwnProperty(newsSlug)) {
          return [];
        }
        objectSlugs[newsSlug] = 1;

        newContentTranslate.push({
          language_field: 'slug',
          language_code: langCode,
          language_value: newsSlug,
        });
      }
    }

    return newContentTranslate;
  }

  private async generateSlug(name, langCode, slug = '', idNewsUpdating = 0) {
    if (!name || !langCode) {
      return '';
    }
    // TODO: cần có giải pháp để xử lý việc khi chỉnh sửa 1 tin tức thì 2 slug anh - việt bị hoán đổi cho nhau
    // TODO: khi đó thì không cần thiết phải đếm số lượng slug đang có
    if (!slug) {
      slug = this.slugService.slug(name);
    } else {
      slug = this.slugService.slug(slug);
    }
    let parameters: any = {
      language_field: 'slug',
      language_value: `${slug}%`,
    };
    let queryCountNumSlugs = this.newsCategoryTranslateRepository
      .createQueryBuilder('news_category_translate')
      .where(
        'language_field = :language_field AND language_value LIKE :language_value',
      );
    if (idNewsUpdating) {
      parameters = {
        ...parameters,
        news_category: idNewsUpdating,
        language_code: langCode,
      };
      const queryExcludeIdUpdating = this.newsCategoryTranslateRepository
        .createQueryBuilder('news_category_translate')
        .select('id')
        .where(
          'news_category = :news_category AND language_code = :language_code',
        );
      queryCountNumSlugs = queryCountNumSlugs.andWhere(
        `id NOT IN (${queryExcludeIdUpdating.getQuery()})`,
      );
    }
    queryCountNumSlugs = queryCountNumSlugs.setParameters(parameters);
    const numSlugs = await queryCountNumSlugs.getCount();

    if (numSlugs) {
      slug = slug + `-${numSlugs + 1}`;
    }

    return slug;
  }
}
