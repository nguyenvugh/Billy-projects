import { Injectable } from '@nestjs/common';
import {
  NewsFeaturesConst,
  NewsStatusConst,
} from 'src/common/constants/news.constant';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { NewsRepository } from 'src/news/repositories/news.repository';
import { NewsCategoryRepository } from './repositories/news-category.repository';
import { NewsCategorySlugHistoryRepository } from './repositories/news-category-slug-history.repository';

@Injectable()
export class NewsCategoryService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsCategoryRepository: NewsCategoryRepository,
    private newsCategorySlugHistoryRepo: NewsCategorySlugHistoryRepository,
  ) {}

  async findOne(lang = 'vi', id: number, reqData) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const category = await this.newsCategoryRepository.findOne({
      relations: ['translates'],
      where: {
        id,
      },
    });
    if (category) {
      const [news, totalRecords] = await this.newsRepository.findAndCount({
        relations: ['translates', 'thumbnail_obj'],
        join: {
          alias: 'news',
          leftJoinAndSelect: {
            translates: 'news.translates',
          },
        },
        where: (qb) => {
          qb.where('translates.language_code = :lang AND status = :status', {
            lang: lang,
            status: NewsStatusConst.PUBLISHED,
          });
          qb.andWhere('category = :id', { id: category.id });
        },
        order: {
          created_at: 'DESC',
        },
        skip: offset,
        take: limit,
      });
      const features = await this.newsRepository.find({
        relations: ['translates', 'thumbnail_obj'],
        join: {
          alias: 'news',
          leftJoinAndSelect: {
            translates: 'news.translates',
          },
        },
        where: (qb) => {
          qb.where('translates.language_code = :lang AND status = :status', {
            lang: lang,
            status: NewsStatusConst.PUBLISHED,
          });
          qb.andWhere(
            'category = :id AND (features = :feature OR features = :both)',
            {
              id: category.id,
              feature: NewsFeaturesConst.PRIVATE,
              both: NewsFeaturesConst.PUBLIC_AND_PRIVATE,
            },
          );
        },
        order: {
          created_at: 'DESC',
        },
        take: 5,
      });
      return {
        code: 200,
        data: {
          ...category,
          features,
          children: {
            data: news,
            totalRecords,
          },
        },
      };
    }
    return {
      code: 404,
      message: 'News Category not found',
    };
  }

  async findOneBySlug(lang = 'vi', slug: string, reqData) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const category = await this.newsCategoryRepository
      .createQueryBuilder('news_category')
      .innerJoinAndSelect(
        'news_category.translates',
        'news_category_translates_get',
      )
      .innerJoin('news_category.translates', 'news_category_translates')
      .where(
        'news_category_translates.language_field = :field AND news_category_translates.language_code = :lang AND news_category_translates.language_value = :slug',
        {
          field: 'slug',
          lang: lang,
          slug: slug,
        },
      )
      .getOne();
    if (!category) {
      const redirectSlug = await this.newsCategorySlugHistoryRepo
        .createQueryBuilder('news_category_slug_history')
        .innerJoinAndSelect(
          'news_category_slug_history.news_category',
          'news_category_slug_history_news_category',
        )
        .innerJoinAndSelect(
          'news_category_slug_history_news_category.translates',
          'news_category_slug_history_news_category_translates',
          'news_category_slug_history_news_category_translates.language_code = :lang AND news_category_slug_history_news_category_translates.language_field = :field',
          {
            field: 'slug',
            lang: lang,
          },
        )
        .where(
          'news_category_slug_history.language_code = :lang AND news_category_slug_history.slug = :slug',
          {
            lang: lang,
            slug: slug,
          },
        )
        .getOne();
      if (!redirectSlug) {
        return {
          code: 404,
          message: 'News Category not found',
        };
      } else {
        return {
          code: 301,
          data: redirectSlug.news_category.translates[0].language_value,
        };
      }
    }
    const [news, totalRecords] = await this.newsRepository.findAndCount({
      relations: ['translates', 'thumbnail_obj'],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          translates: 'news.translates',
        },
      },
      where: (qb) => {
        qb.where('translates.language_code = :lang AND status = :status', {
          lang: lang,
          status: NewsStatusConst.PUBLISHED,
        });
        qb.andWhere('category = :id', { id: category.id });
      },
      order: {
        created_at: 'DESC',
      },
      skip: offset,
      take: limit,
    });
    const features = await this.newsRepository.find({
      relations: ['translates', 'thumbnail_obj'],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          translates: 'news.translates',
        },
      },
      where: (qb) => {
        qb.where('translates.language_code = :lang AND status = :status', {
          lang: lang,
          status: NewsStatusConst.PUBLISHED,
        });
        qb.andWhere(
          'category = :id AND (features = :feature OR features = :both)',
          {
            id: category.id,
            feature: NewsFeaturesConst.PRIVATE,
            both: NewsFeaturesConst.PUBLIC_AND_PRIVATE,
          },
        );
      },
      order: {
        created_at: 'DESC',
      },
      take: 5,
    });
    return {
      code: 200,
      data: {
        ...category,
        features,
        children: {
          data: news,
          totalRecords,
        },
      },
    };
  }

  async findSlugOtherLang(lang = 'vi', slug: string, otherLang: string) {
    const category = await this.newsCategoryRepository
      .createQueryBuilder('news_category')
      .innerJoinAndSelect(
        'news_category.translates',
        'news_category_translates_get',
        'news_category_translates_get.language_code = :other_lang AND news_category_translates_get.language_field = :field',
        {
          other_lang: otherLang,
          field: 'slug',
        },
      )
      .innerJoin('news_category.translates', 'news_category_translates')
      .where(
        'news_category_translates.language_field = :field AND news_category_translates.language_value = :slug',
        {
          field: 'slug',
          slug: slug,
        },
      )
      .getOne();
    if (!category) {
      return {
        code: 404,
        message: 'Slug not found',
      };
    } else {
      return {
        code: 200,
        data: category.translates[0].language_value,
      };
    }
  }
}
