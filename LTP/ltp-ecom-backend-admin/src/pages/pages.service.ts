import { Injectable } from '@nestjs/common';
import { Not, In } from 'typeorm';
import { DeletedConst } from 'src/common/constants';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { CreatePageDto } from './dto/create.dto';
import { FindAllPageDto } from './dto/find-all.dto';
import { UpdatePageDto } from './dto/update.dto';
import { PageRepository } from './repositories/page.repository';
import { PageTranslateRepository } from './repositories/page-translate.repository';
import { PageSlugHistoryRepository } from './repositories/page-slug-histories.repository';
import slugify from 'slugify';
import { PageErrorCodes } from 'src/common/error-codes/page.error-code';
import { CompanyInformationRepository } from './repositories/company-information.repository';
import { CompanyInformationTranslateRepository } from './repositories/company-information-translate.repository';
import { UpdateCompanyInformationDto } from './dto/update-company-information';

@Injectable()
export class PagesService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly pageTranslateRepository: PageTranslateRepository,
    private readonly pageSlugHistoryRepo: PageSlugHistoryRepository,
    private readonly companyInformationRepository: CompanyInformationRepository,
    private readonly companyInformationTranslateRepository: CompanyInformationTranslateRepository,
  ) {}

  async findAll(findRequest: FindAllPageDto): Promise<any> {
    try {
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const [results, totalRecords] = await this.pageRepository.findAndCount({
        relations: ['translates'],
        order: {
          created_at: 'DESC',
        },
        skip: offset,
        take: limit,
      });
      return {
        results,
        totalRecords,
      };
    } catch (err) {
      return {
        results: [],
        totalRecords: 0,
      };
    }
  }

  async initData(): Promise<any> {
    const checkExist = await this.pageRepository.count();
    if (checkExist && checkExist > 0) {
      return false;
    }
    const data = [
      {
        id: 1,
        title: 'Câu hỏi thường gặp',
        slug: 'cau-hoi-thuong-gap',
      },
      {
        id: 2,
        title: 'Thông tin chính sách',
        slug: 'thong-tin-chinh-sach',
      },
      {
        id: 3,
        title: 'Về Long Thành',
        slug: 've-long-thanh',
      },
      {
        id: 4,
        title: 'Tuyển dụng',
        slug: 'tuyen-dung',
      },
      {
        id: 5,
        title: 'Điều khoản dịch vụ',
        slug: 'dieu-khoan-dich-vu',
      },
      {
        id: 6,
        title: 'Chính sách bảo mật',
        slug: 'chinh-sach-bao-mat',
      },
    ];
    for (const page of data) {
      await this.pageRepository.save({
        id: page.id,
        slug: page.slug,
      });
      await this.pageTranslateRepository.save({
        page: page.id,
        language_code: 'vi',
        language_field: 'title',
        language_value: page.title,
      });
    }
    return 'success';
  }

  async initSlugData(): Promise<any> {
    const data = [
      {
        page: 1,
        language_code: 'vi',
        language_field: 'slug',
        language_value: 'cau-hoi-thuong-gap',
      },
      {
        page: 1,
        language_code: 'en',
        language_field: 'slug',
        language_value: 'q-a',
      },
      {
        page: 2,
        language_code: 'vi',
        language_field: 'slug',
        language_value: 'thong-tin-chinh-sach',
      },
      {
        page: 2,
        language_code: 'en',
        language_field: 'slug',
        language_value: 'privacy',
      },
      {
        page: 3,
        language_code: 'vi',
        language_field: 'slug',
        language_value: 've-long-thanh',
      },
      {
        page: 3,
        language_code: 'en',
        language_field: 'slug',
        language_value: 'about-us',
      },
      {
        page: 4,
        language_code: 'vi',
        language_field: 'slug',
        language_value: 'tuyen-dung',
      },
      {
        page: 4,
        language_code: 'en',
        language_field: 'slug',
        language_value: 'recruit',
      },
      {
        page: 5,
        language_code: 'vi',
        language_field: 'slug',
        language_value: 'dieu-khoan-dich-vu',
      },
      {
        page: 5,
        language_code: 'en',
        language_field: 'slug',
        language_value: 'terms-of-service',
      },
      {
        page: 6,
        language_code: 'vi',
        language_field: 'slug',
        language_value: 'chinh-sach-bao-mat',
      },
      {
        page: 6,
        language_code: 'en',
        language_field: 'slug',
        language_value: 'privacy-policy',
      },
    ];
    await this.pageTranslateRepository.delete({
      language_field: 'slug',
    });
    await this.pageTranslateRepository.save(data);

    return 'success';
  }

  async create(data: CreatePageDto): Promise<any> {
    try {
      const { contents } = data;
      if (contents && contents.length > 0) {
        let slug = '';
        contents.map((item) => {
          if (
            slug === '' &&
            item.language_code === 'vi' &&
            item.language_field === 'title'
          ) {
            slug = slugify(item?.language_value);
          }
        });
        const pageCreated = await this.pageRepository.save({
          slug,
        });
        if (!pageCreated) {
          const errorCode = 'page::001';
          return {
            code: 500,
            errorCode,
            message: PageErrorCodes[errorCode],
          };
        }
        const translates = contents.map((item) => ({
          ...item,
          page: pageCreated['id'],
        }));
        await this.pageTranslateRepository.save(translates);
        return {
          code: 200,
          data: pageCreated,
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

  async update(data: UpdatePageDto): Promise<any> {
    try {
      const { id, contents } = data;
      //const page = await this.pageRepository.findOne(id);
      const page = await this.pageRepository
        .createQueryBuilder('page')
        .innerJoinAndSelect('page.translates', 'page_translates')
        .where({
          id: id,
        })
        .getOne();
      if (page) {
        const oldSlug: any = {};
        const newSlugs = {};
        page.translates.forEach((translate) => {
          if ('slug' == translate.language_field) {
            oldSlug[translate.language_code] = translate.language_value;
          }
        });
        if (contents && contents.length > 0) {
          const dataSaveSlugHistories: any[] = [];
          const translates = contents.map((item) => {
            if ('slug' == item.language_field) {
              if (false == newSlugs.hasOwnProperty(item.language_value)) {
                newSlugs[item.language_value] = 1;
              }
              if (true == oldSlug.hasOwnProperty(item.language_code)) {
                if (oldSlug[item.language_code] != item.language_value) {
                  dataSaveSlugHistories.push({
                    page_id: id,
                    language_code: item.language_code,
                    slug: oldSlug[item.language_code],
                  });
                }
              }
            }
            return {
              ...item,
              page: id,
            };
          });
          // Check duplicate slug
          let slugDuplicated = false;
          const arrNewSlugs = Object.keys(newSlugs);
          // Must has two different slugs for two languages
          if (2 != arrNewSlugs.length) {
            slugDuplicated = true;
          } else {
            const checkSlugDuplicateWithOther =
              await this.pageTranslateRepository.findOne({
                page: Not(id),
                language_field: 'slug',
                language_value: In(arrNewSlugs),
              });
            if (checkSlugDuplicateWithOther) {
              slugDuplicated = true;
            }
          }
          if (slugDuplicated) {
            const errorCode = 'page::003';
            return {
              code: 400,
              errorCode,
              message: PageErrorCodes[errorCode],
            };
          }
          await this.pageTranslateRepository.delete({ page: id });
          await Promise.all([
            this.pageTranslateRepository.save(translates),
            this.pageSlugHistoryRepo.save(dataSaveSlugHistories),
          ]);
          return {
            code: 200,
            message: 'Update page successfully',
          };
        }
      } else {
        const errorCode = 'page::002';
        return {
          code: 404,
          errorCode,
          message: PageErrorCodes[errorCode],
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

  async findOne(id: number): Promise<any> {
    try {
      const page = await this.pageRepository.findOne({
        relations: ['translates'],
        where: {
          id,
        },
      });
      return page || null;
    } catch (err) {
      return null;
    }
  }

  async findBySlug(slug: string): Promise<any> {
    try {
      const page = await this.pageRepository.findOne({
        relations: ['translates'],
        where: {
          slug,
        },
      });
      return page || null;
    } catch (err) {
      return null;
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const pages = await this.pageRepository.findByIds(idsArr);
    if (pages && pages.length > 0) {
      for (const page of pages) {
        page.deleted_at = new Date();
        page.deleted = DeletedConst.DELETED;
        await this.pageRepository.save(page);
      }
      return {
        code: 200,
        message: 'Selected page deleted successfully',
      };
    } else {
      const errorCode = 'page::002';
      return {
        code: 404,
        errorCode,
        message: PageErrorCodes[errorCode],
      };
    }
  }

  async getCompanyInformation(): Promise<any> {
    return {
      code: 200,
      data: await this.companyInformationRepository.findOne(1, {
        relations: ['translates'],
      }),
    };
  }

  async updateCompanyInformation(
    data: UpdateCompanyInformationDto,
  ): Promise<any> {
    const { contents } = data;
    try {
      const id = 1;
      const payload = { id };
      await this.companyInformationRepository.save(payload);
      await this.companyInformationTranslateRepository.delete({
        company_information: id,
      });
      const translates = contents.map((item) => ({
        ...item,
        company_information: id,
      }));
      await this.companyInformationTranslateRepository.save(translates);
      return {
        code: 200,
        message: 'Update company information successfully',
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
}
