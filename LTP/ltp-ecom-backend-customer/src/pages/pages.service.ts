import { Injectable } from '@nestjs/common';
import { CompanyInformationRepository } from './repositories/company-information.repository';
import { PageRepository } from './repositories/page.repository';
import { PageSlugHistoryRepository } from './repositories/page-slug-histories.repository';

@Injectable()
export class PagesService {
  constructor(
    private readonly pageRepository: PageRepository,
    private pageSlugHistoryRepo: PageSlugHistoryRepository,
    private readonly companyInformationRepository: CompanyInformationRepository,
  ) {}

  async findBySlug(lang = 'vi', slug: string): Promise<any> {
    let code = 200;
    let data = null;

    try {
      /*const page = await this.pageRepository.findOne({
        relations: ['translates'],
        join: {
          alias: 'pages',
          leftJoinAndSelect: {
            translates: 'pages.translates',
          },
        },
        where: (qb) => {
          qb.where('translates.language_code = :lang', {
            lang: lang,
          });
          qb.andWhere('slug = :slug', { slug: slug });
        },
      });*/
      const page = await this.pageRepository
        .createQueryBuilder('page')
        .innerJoinAndSelect(
          'page.translates',
          'page_translates_get',
          'page_translates_get.language_code = :lang',
          {
            lang: lang,
          },
        )
        .innerJoin('page.translates', 'page_translates')
        .where(
          'page_translates.language_field = :field AND page_translates.language_code = :lang AND page_translates.language_value = :slug',
          {
            field: 'slug',
            lang: lang,
            slug: slug,
          },
        )
        .getOne();
      if (!page) {
        const redirectSlug = await this.pageSlugHistoryRepo
          .createQueryBuilder('page_slug_history')
          .innerJoinAndSelect(
            'page_slug_history.page',
            'page_slug_history_page',
          )
          .innerJoinAndSelect(
            'page_slug_history_page.translates',
            'page_slug_history_page_translates',
            'page_slug_history_page_translates.language_code = :lang AND page_slug_history_page_translates.language_field = :field',
            {
              field: 'slug',
              lang: lang,
            },
          )
          .where(
            'page_slug_history.language_code = :lang AND page_slug_history.slug = :slug',
            {
              lang: lang,
              slug: slug,
            },
          )
          .getOne();
        if (!redirectSlug) {
          code = 404;
          data = 'Page not found';
        } else {
          code = 301;
          data = redirectSlug.page.translates[0].language_value;
        }
      } else {
        data = page;
      }
    } catch (err) {
      code = 404;
      data = 'Page not found';
    }

    return {
      code,
      data,
    };
  }

  async findSlugOtherLang(lang = 'vi', slug: string, otherLang: string) {
    const page = await this.pageRepository
      .createQueryBuilder('page')
      .innerJoinAndSelect(
        'page.translates',
        'page_translates_get',
        'page_translates_get.language_code = :other_lang AND page_translates_get.language_field = :field',
        {
          other_lang: otherLang,
          field: 'slug',
        },
      )
      .innerJoin('page.translates', 'page_translates')
      .where(
        'page_translates.language_field = :field AND page_translates.language_value = :slug',
        {
          field: 'slug',
          slug: slug,
        },
      )
      .getOne();
    if (!page) {
      return {
        code: 404,
        message: 'Slug not found',
      };
    } else {
      return {
        code: 200,
        data: page.translates[0].language_value,
      };
    }
  }

  async getCompanyInformation(lang = 'vi'): Promise<any> {
    const data = await this.companyInformationRepository.findOne({
      relations: ['translates'],
      join: {
        alias: 'company_information',
        leftJoinAndSelect: {
          translates: 'company_information.translates',
        },
      },
      where: (qb) => {
        qb.where('translates.language_code = :lang', {
          lang: lang,
        });
        qb.andWhere('company_information.id = :id', { id: 1 });
      },
    });
    return {
      code: 200,
      data,
    };
  }
}
