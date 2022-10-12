import { Injectable } from '@nestjs/common';
import {
  NewsFeaturesConst,
  NewsStatusConst,
} from 'src/common/constants/news.constant';
import { processTranslateData } from '../common/helpers/translate.helper';
import { GetLatestNewsDto } from './dto/get-latest-news.dto';
import { NewsCategoryRepository } from 'src/news-category/repositories/news-category.repository';
import { NewsSlugHistoryRepository } from './repositories/news-slug-history.repository';
import { NewsRepository } from './repositories/news.repository';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly newsCategoryRepository: NewsCategoryRepository,
    private newsSlugHistoryRepo: NewsSlugHistoryRepository,
  ) {}

  async findAll(lang = 'vi') {
    const categories = await this.newsCategoryRepository.find({
      relations: ['translates'],
      join: {
        alias: 'newsCategory',
        leftJoinAndSelect: {
          translates: 'newsCategory.translates',
        },
      },
      where: (qb) => {
        qb.where('translates.language_code = :lang', {
          lang: lang,
        });
      },
    });
    const records = [];
    for (const category of categories) {
      const news = await this.newsRepository.find({
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
        take: 5,
      });
      records.push({
        ...category,
        childrens: news,
      });
    }
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
        qb.andWhere('features = :public OR features = :both', {
          public: NewsFeaturesConst.PUBLIC,
          both: NewsFeaturesConst.PUBLIC_AND_PRIVATE,
        });
      },
      order: {
        created_at: 'DESC',
      },
      take: 5,
    });
    return {
      code: 200,
      data: {
        features,
        categories: records,
      },
    };
  }

  async findLatest(lang = 'vi') {
    const news = await this.newsRepository.find({
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
      },
      order: {
        updated_at: 'DESC',
      },
      take: 5,
    });
    return {
      code: 200,
      data: news,
    };
  }

  async findOne(lang = 'vi', id: number) {
    const news = await this.newsRepository.findOne(id, {
      relations: [
        'translates',
        'thumbnail_obj',
        'category_obj',
        'category_obj.translates',
      ],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          translates: 'news.translates',
        },
      },
    });
    if (news) {
      const relateds = await this.newsRepository.find({
        relations: ['translates', 'thumbnail_obj'],
        join: {
          alias: 'news',
          leftJoinAndSelect: {
            translates: 'news.translates',
          },
        },
        where: (qb) => {
          qb.where(
            'category = :category AND translates.language_code = :lang AND status = :status',
            {
              category: news.category,
              lang: lang,
              status: NewsStatusConst.PUBLISHED,
            },
          );
        },
        order: {
          created_at: 'DESC',
        },
        take: 3,
      });
      return {
        code: 200,
        data: {
          relateds,
          news,
        },
      };
    }
    return {
      code: 404,
      message: 'News not found',
    };
  }

  async findOneBySlug(lang = 'vi', slug: string) {
    const news = await this.newsRepository
      .createQueryBuilder('news')
      .innerJoinAndSelect(
        'news.translates',
        'news_translates_get',
        'news_translates_get.language_code = :lang',
        {
          lang: lang,
        },
      )
      .innerJoin('news.translates', 'news_translates')
      .innerJoinAndSelect('news.thumbnail_obj', 'news_thumbnail_obj')
      .innerJoinAndSelect('news.category_obj', 'news_category_obj')
      .innerJoinAndSelect(
        'news_category_obj.translates',
        'news_category_obj_translates',
      )
      .where(
        'news_translates.language_field = :field AND news_translates.language_code = :lang AND news_translates.language_value = :slug',
        {
          field: 'slug',
          lang: lang,
          slug: slug,
        },
      )
      .getOne();
    if (!news) {
      const redirectSlug = await this.newsSlugHistoryRepo
        .createQueryBuilder('news_slug_history')
        .innerJoinAndSelect('news_slug_history.news', 'news_slug_history_news')
        .innerJoinAndSelect(
          'news_slug_history_news.translates',
          'news_slug_history_news_translates',
          'news_slug_history_news_translates.language_code = :lang AND news_slug_history_news_translates.language_field = :field',
          {
            field: 'slug',
            lang: lang,
          },
        )
        .where(
          'news_slug_history.language_code = :lang AND news_slug_history.slug = :slug',
          {
            lang: lang,
            slug: slug,
          },
        )
        .getOne();
      if (!redirectSlug) {
        return {
          code: 404,
          message: 'News not found',
        };
      } else {
        return {
          code: 301,
          data: redirectSlug.news.translates[0].language_value,
        };
      }
    }
    const relateds = await this.newsRepository.find({
      relations: ['translates', 'thumbnail_obj'],
      join: {
        alias: 'news',
        leftJoinAndSelect: {
          translates: 'news.translates',
        },
      },
      where: (qb) => {
        qb.where(
          'category = :category AND translates.language_code = :lang AND status = :status',
          {
            category: news.category,
            lang: lang,
            status: NewsStatusConst.PUBLISHED,
          },
        );
      },
      order: {
        created_at: 'DESC',
      },
      take: 3,
    });
    return {
      code: 200,
      data: {
        relateds,
        news,
      },
    };
  }

  async findSlugOtherLang(lang = 'vi', slug: string, otherLang: string) {
    const news = await this.newsRepository
      .createQueryBuilder('news')
      .innerJoinAndSelect(
        'news.translates',
        'news_translates_get',
        'news_translates_get.language_code = :other_lang AND news_translates_get.language_field = :field',
        {
          other_lang: otherLang,
          field: 'slug',
        },
      )
      .innerJoin('news.translates', 'news_translates')
      .where(
        'news_translates.language_field = :field AND news_translates.language_value = :slug',
        {
          field: 'slug',
          slug: slug,
        },
      )
      .getOne();
    if (!news) {
      return {
        code: 404,
        message: 'Slug not found',
      };
    } else {
      return {
        code: 200,
        data: news.translates[0].language_value,
      };
    }
  }

  async getLatestNews(reqData: GetLatestNewsDto) {
    const data = await this.newsRepository
      .createQueryBuilder('news')
      .innerJoinAndSelect(
        'news.translates',
        'news_translates',
        'language_code= :lang',
        {
          lang: reqData.lang,
        },
      )
      .leftJoinAndSelect('news.thumbnail_obj', 'news_thumbnail_obj')
      .where('status = :status', {
        status: NewsStatusConst.PUBLISHED,
      })
      .orderBy({
        'news.scheduled_at': 'DESC',
      })
      .take(reqData.limit)
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
