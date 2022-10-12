import { Injectable } from '@nestjs/common';
import {
  NewsFeaturesConst,
  NewsStatusConst,
} from 'src/common/constants/news.constant';
import { DeletedConst } from 'src/common/constants/soft-delete.constant';
import { SortValueConst } from 'src/common/constants/sorting.constant';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { NewsErrorCodes } from 'src/common/error-codes/news.error-codes';
import { RpcErrorExc } from '../common/exceptions/custom.exception';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { SlugService } from '../common/services/slug.service';
import { convertVietnameseCharsToEnglishChars } from '../common/helpers/util.helper';
import { Brackets, FindManyOptions, In, Like, Not } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { FindNewsByCriteriaDto } from './dto/find-by-criteria.dto';
import { NewsTranslateRepository } from './repositories/news-translate.repository';
import { NewsSlugHistoryRepository } from './repositories/news-slug-history.repository';
import { NewsRepository } from './repositories/news.repository';
import { News } from './schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsTranslateRepository: NewsTranslateRepository,
    private newsSlugHistoryRepo: NewsSlugHistoryRepository,
    private slugService: SlugService,
  ) {}

  async initSlugData() {
    const newsNamesData = await this.newsTranslateRepository.find({
      where: {
        language_field: 'name',
      },
      order: {
        id: 'ASC',
      },
    });
    const groupNewsBySlugs: any = {};
    if (newsNamesData.length) {
      newsNamesData.forEach((item) => {
        const newsSlug = this.slugService.slug(item.language_value);
        if (false == groupNewsBySlugs.hasOwnProperty(newsSlug)) {
          groupNewsBySlugs[newsSlug] = [];
        }
        groupNewsBySlugs[newsSlug].push({
          news_id: item.news,
          language_code: item.language_code,
        });
      });
    }
    const dataInitSlug: any[] = [];
    for (const newsSlug in groupNewsBySlugs) {
      if (true == groupNewsBySlugs.hasOwnProperty(newsSlug)) {
        const newsItems = groupNewsBySlugs[newsSlug];
        for (let index = 0; index < newsItems.length; index++) {
          const newsItem = newsItems[index];
          dataInitSlug.push({
            news: newsItem.news_id,
            language_code: newsItem.language_code,
            language_field: 'slug',
            language_value: 0 == index ? newsSlug : `${newsSlug}-${index + 1}`,
          });
        }
      }
    }
    await this.newsTranslateRepository.delete({
      language_field: 'slug',
    });
    await this.newsTranslateRepository.save(dataInitSlug);

    return 'success';
  }

  async findByCriteria(findRequest: FindNewsByCriteriaDto): Promise<any> {
    try {
      const {
        search_value,
        status,
        category,
        is_public_features = false,
        is_private_features = false,
        sort_field,
        sort_type,
      } = findRequest;
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const conditions = {};
      if (
        (is_public_features == false && is_private_features == true) ||
        (is_public_features == true && is_private_features == false)
      ) {
        if (is_public_features == true) {
          conditions['features'] = In([
            NewsFeaturesConst.PUBLIC,
            NewsFeaturesConst.PUBLIC_AND_PRIVATE,
          ]);
        }
        if (is_private_features == true) {
          conditions['features'] = In([
            NewsFeaturesConst.PRIVATE,
            NewsFeaturesConst.PUBLIC_AND_PRIVATE,
          ]);
        }
      }
      if (status) {
        if (!this.validateStatus(status).value) {
          return this.validateStatus(status).error;
        } else {
          conditions['status'] = status;
        }
      }
      if (category) {
        conditions['category'] = category;
      }
      const order = {};
      if (sort_field && sort_type) {
        const columns = Object.keys(this.newsRepository.metadata.propertiesMap);
        if (!columns.includes(sort_field)) {
          const errorCode = 'common::002';
          return {
            code: 404,
            errorCode,
            message: CommonErrorCodes[errorCode],
          };
        }
        if (![SortValueConst.ASC, SortValueConst.DESC].includes(sort_type)) {
          const errorCode = 'common::003';
          return {
            code: 404,
            errorCode,
            message: CommonErrorCodes[errorCode],
          };
        }
        order[sort_field] = sort_type;
      } else {
        order['created_at'] = SortValueConst.DESC;
      }
      const query: FindManyOptions<News> = {
        join: {
          alias: 'news',
          leftJoinAndSelect: {
            thumbnail_obj: 'news.thumbnail_obj',
            category_obj: 'news.category_obj',
            category_translate: 'category_obj.translates',
          },
          innerJoinAndSelect: {
            translates: 'news.translates',
          },
        },
        where: (qb) => {
          if (
            search_value ||
            status ||
            category ||
            is_public_features ||
            is_private_features
          ) {
            qb.where({
              ...conditions,
            });
            if (search_value) {
              qb.andWhere(
                'translates.language_field = :name AND translates.language_value like :value',
                {
                  name: 'name',
                  value: `%${search_value}%`,
                },
              );
            }
            if (is_public_features == true && is_private_features == true) {
              qb.andWhere('features = :publicAndPrivate', {
                publicAndPrivate: NewsFeaturesConst.PUBLIC_AND_PRIVATE,
              });
            }
          }
        },
        order: order,
        skip: offset,
        take: limit,
      };
      const [results, totalRecords] = await Promise.all([
        this.newsRepository.find(query),
        this.newsRepository.count(query),
      ]);
      return {
        code: 200,
        data: {
          results,
          totalRecords,
        },
      };
    } catch (err) {
      console.log('err', err);

      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  async create(data: CreateNewsDto): Promise<any> {
    try {
      const {
        thumbnail_id,
        category_id,
        author,
        status,
        features,
        scheduled_at,
      } = data;
      const payload = {
        thumbnail: thumbnail_id,
        category: category_id,
        author,
        status,
        features,
        scheduled_at,
      };
      if (!this.validateFeatures(features).value) {
        return this.validateFeatures(features).error;
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      let newContentsTranslate =
        await this.generateContentsTranslateIncludeSlugs(data.contents);
      if (!newContentsTranslate.length) {
        const errorCode = 'news::001';
        return {
          code: 500,
          errorCode,
          message: NewsErrorCodes[errorCode],
        };
      }
      const newsCreated = await this.newsRepository.save(payload);
      if (!newsCreated) {
        const errorCode = 'news::001';
        return {
          code: 500,
          errorCode,
          message: NewsErrorCodes[errorCode],
        };
      }
      newContentsTranslate = newContentsTranslate.map((item) => {
        return {
          ...item,
          news: newsCreated['id'],
        };
      });
      await this.newsTranslateRepository.save(newContentsTranslate);
      return {
        code: 200,
        data: newsCreated,
      };
    } catch (err) {
      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  async update(data: CreateNewsDto): Promise<any> {
    try {
      const {
        id,
        thumbnail_id,
        category_id,
        author,
        status,
        features,
        scheduled_at,
      } = data;
      if (!this.validateFeatures(features).value) {
        return this.validateFeatures(features).error;
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      const news = await this.newsRepository
        .createQueryBuilder('news')
        .innerJoinAndSelect('news.translates', 'news_translates')
        .where({
          id: id,
        })
        .getOne();
      if (news) {
        const oldSlug: any = {};
        news.translates.forEach((translate) => {
          if ('slug' == translate.language_field) {
            oldSlug[translate.language_code] = translate.language_value;
          }
        });
        let newContentsTranslate =
          await this.generateContentsTranslateIncludeSlugs(data.contents, id);
        if (!newContentsTranslate.length) {
          const errorCode = 'news::001';
          return {
            code: 500,
            errorCode,
            message: NewsErrorCodes[errorCode],
          };
        }
        const payload = {
          id,
          thumbnail: thumbnail_id,
          category: category_id,
          author,
          status,
          features,
          scheduled_at,
        };
        await this.newsTranslateRepository.delete({ news: id });
        const dataSaveSlugHistories: any[] = [];
        newContentsTranslate = newContentsTranslate.map((item) => {
          if ('slug' == item.language_field) {
            if (true == oldSlug.hasOwnProperty(item.language_code)) {
              if (oldSlug[item.language_code] != item.language_value) {
                dataSaveSlugHistories.push({
                  news_id: id,
                  language_code: item.language_code,
                  slug: oldSlug[item.language_code],
                });
              }
            }
          }

          return {
            ...item,
            news: id,
          };
        });
        await Promise.all([
          this.newsRepository.save(payload),
          this.newsTranslateRepository.save(newContentsTranslate),
          this.newsSlugHistoryRepo.save(dataSaveSlugHistories),
        ]);
        return {
          code: 200,
          message: 'Update news successfully',
        };
      } else {
        const errorCode = 'news::002';
        return {
          code: 404,
          errorCode,
          message: NewsErrorCodes[errorCode],
        };
      }
    } catch (err) {
      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const news = await this.newsRepository.findByIds(idsArr);
    if (news && news.length > 0) {
      news.map(async (item) => {
        item.deleted_at = new Date();
        item.deleted = DeletedConst.DELETED;
        await this.newsRepository.save(item);
      });
      return {
        code: 200,
        message: 'Selected news deleted successfully',
      };
    } else {
      const errorCode = 'news::002';
      return {
        code: 404,
        errorCode,
        message: NewsErrorCodes[errorCode],
      };
    }
  }

  async findById(id: number) {
    if (!id) {
      throw new RpcErrorExc(`not_found:Tin tức không tồn tại`);
    }
    const news = await this.newsRepository.findOne(id, {
      relations: ['translates'],
    });
    if (!news) {
      throw new RpcErrorExc(`not_found:Tin tức không tồn tại`);
    }
    return news;
  }

  private validateStatus(status: NewsStatusConst) {
    if (status) {
      const statuses = Object.keys(NewsStatusConst);
      if (statuses.includes(status + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'news::004';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: NewsErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'news::003';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: NewsErrorCodes[errorCode],
        },
      };
    }
  }

  private validateFeatures(feature: NewsFeaturesConst) {
    if (feature) {
      const features = Object.keys(NewsFeaturesConst);
      if (features.includes(feature + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'news::006';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: NewsErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'news::005';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: NewsErrorCodes[errorCode],
        },
      };
    }
  }

  private async generateContentsTranslateIncludeSlugs(
    contentsTranslate: any[],
    idNewsUpdating = 0,
  ) {
    const newsTranslateDataByLanguageCode: any = {};
    const newContentTranslate: any[] = [];
    contentsTranslate.forEach((item) => {
      if (
        false ==
        newsTranslateDataByLanguageCode.hasOwnProperty(item.language_code)
      ) {
        newsTranslateDataByLanguageCode[item.language_code] = {
          name: '',
          slug: '',
        };
      }
      if ('name' == item.language_field) {
        newsTranslateDataByLanguageCode[item.language_code]['name'] =
          item.language_value;
      }
      if ('slug' == item.language_field) {
        newsTranslateDataByLanguageCode[item.language_code]['slug'] =
          item.language_value;
      }
      if ('slug' != item.language_field) {
        newContentTranslate.push(item);
      }
    });
    const objectSlugs: any = {};
    for (const langCode in newsTranslateDataByLanguageCode) {
      if (true == newsTranslateDataByLanguageCode.hasOwnProperty(langCode)) {
        const newsTranslateData = newsTranslateDataByLanguageCode[langCode];
        const newsSlug = await this.generateSlug(
          newsTranslateData['name'],
          langCode,
          newsTranslateData['slug'],
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
    let queryCountNumSlugs = this.newsTranslateRepository
      .createQueryBuilder('news_translate')
      .where(
        'language_field = :language_field AND language_value LIKE :language_value',
      );
    if (idNewsUpdating) {
      parameters = {
        ...parameters,
        news: idNewsUpdating,
        language_code: langCode,
      };
      const queryExcludeIdUpdating = this.newsTranslateRepository
        .createQueryBuilder('news_translate')
        .select('id')
        .where('news = :news AND language_code = :language_code');
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
