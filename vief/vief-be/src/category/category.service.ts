import { Injectable } from '@nestjs/common';
import { In, IsNull } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { LangEnum } from '../common/constants/global.constant';
import {
  ConflictExc,
  NotFoundExc,
} from '../common/exceptions/custom.exception';
import { getPagingParams, validateDuplicateByField } from '../common/utils';
import { FileService } from '../file/file.service';
import { CreateCategoryDto } from './dto/req/create-category.dto';
import { EditCategoryDto } from './dto/req/edit-category.dto';
import { GetAllCategoryDto } from './dto/req/get-all-category.dto';
import { CategoryTranslationRepository } from './repository/category-translate.repository';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private categoryTranslationRepository: CategoryTranslationRepository,
    private fileService: FileService,
  ) {}

  @Transactional()
  async createCategory(category: CreateCategoryDto) {
    const {
      type,
      thumbnailId,
      isFeature,
      field,
      path = '',
      translations,
    } = category;
    validateDuplicateByField('lang', translations);
    validateDuplicateByField('slug', translations);

    const isExitBySlug = await this.categoryTranslationRepository.find({
      where: {
        slug: In(translations.map((translation) => translation.slug)),
        deletedAt: IsNull(),
      },
    });

    if (isExitBySlug.length > 0) throw new ConflictExc('slug already exists');

    const image = await this.fileService.findOneOrError(thumbnailId);

    const cate = this.categoryRepository.create({
      field,
      isFeature,
      thumbnail: image,
      type,
      path,
    });

    await this.categoryRepository.save(cate);

    const data = translations.map((item) => {
      return {
        ...item,
        category: cate,
      };
    });

    const trans = await this.categoryTranslationRepository.create(data);
    await this.categoryTranslationRepository.insert(trans);

    return cate;
  }

  async getAllCategoryByAdmin(getCategory: GetAllCategoryDto) {
    const { page, size, name, ...c } = getCategory;
    const { take, skip } = getPagingParams(page, size);

    const [data, total] = await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.translates', 'translates')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .where((qb) => {
        qb.where({
          ...c,
        })
          .andWhere('translates.lang = :lang', { lang: LangEnum.Vi })
          .andWhere('category.deletedAt isnull');
        if (name) {
          qb.where('translates.name LIKE :name', { name: `%${name}%` })
            .andWhere('translates.lang = :lang', { lang: LangEnum.Vi })
            .andWhere('category.deletedAt isnull');
        }
      })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return {
      data,
      total,
    };
  }

  async getCategoryById(id: number) {
    const res = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['translates', 'thumbnail'],
    });
    if (!res) throw new NotFoundExc();
    return res;
  }
  @Transactional()
  async deleteCategories(id) {
    const data = await this.categoryTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.category', 'category')
      .where('category.id IN (:...id)', { id })
      .getMany();
    const ids = data.map((i) => i.id);

    if (ids.length > 0) {
      const resultTrans = await this.categoryTranslationRepository.softDelete(
        ids,
      );

      if (!resultTrans.affected) {
        throw new NotFoundExc('translate');
      }
    }
    const result = await this.categoryRepository.softDelete({
      id: In(id),
    });
    if (!result.affected) throw new NotFoundExc();
    return result;
  }

  async getAllCategoryClient(getCategory: GetAllCategoryDto, lang: LangEnum) {
    const { page, size, name, ...c } = getCategory;
    const { take, skip } = getPagingParams(page, size);
    const language = lang ? lang : LangEnum.Vi;

    const [data, total] = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.translates', 'translates')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .where((qb) => {
        qb.where({
          ...c,
        })
          .andWhere('translates.lang = :lang', { lang: language })
          .andWhere('category.deletedAt isnull');
        if (name) {
          qb.where('translates.name LIKE :name', { name: `%${name}%` })
            .andWhere('translates.lang = :lang', { lang: language })
            .andWhere('category.deletedAt isnull');
        }
      })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return {
      data,
      total,
    };
  }
  @Transactional()
  async editCategory(editCategory: EditCategoryDto, id: number) {
    const { translations, thumbnailId } = editCategory;
    validateDuplicateByField('lang', translations);
    validateDuplicateByField('slug', translations);

    const image = await this.fileService.findOneOrError(thumbnailId);
    let cate = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });
    if (!cate) throw new NotFoundExc();
    cate = {
      ...cate,
      ...editCategory,
      thumbnail: image,
    };
    const translate = await this.categoryTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.category', 'category')
      .where('category.id = :id', { id: cate.id })
      .getMany();

    const transNotExitLang = [];
    translations.forEach((trans, index) => {
      if (!translate.map((t) => t.lang).includes(trans.lang)) {
        transNotExitLang.push(trans);
        translations.splice(index, 1);
      }
    });

    const listTransId = await this.categoryTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.category', 'category')
      .where('translate.slug IN (:...slugs)', {
        slugs: translations.map((translation) => translation.slug),
      })
      .andWhere('category.id = :id', { id })
      .getMany();

    const isExitBySlug = await this.categoryTranslationRepository
      .createQueryBuilder()
      .where((qb) => {
        if (listTransId.length) {
          qb.where({
            slug: In(transNotExitLang.map((translation) => translation?.slug)),
          }).orWhere('id NOT IN (:...ids) AND slug IN (:...slugs)', {
            slugs: translations.map((t) => t?.slug),
            ids: listTransId.map((t) => t?.id),
          });
        } else {
          qb.where({
            slug: In(transNotExitLang.map((translation) => translation?.slug)),
          }).orWhere('slug IN (:...slugs)', {
            slugs: translations.map((t) => t?.slug),
          });
        }
      })
      .getMany();

    if (isExitBySlug.length) throw new ConflictExc('slug already exists');
    const data = transNotExitLang.map((item) => {
      return {
        ...item,
        category: cate,
      };
    });

    translations.forEach(async (trans) => {
      const translate = await this.categoryTranslationRepository
        .createQueryBuilder('translate')
        .leftJoinAndSelect('translate.category', 'category')
        .where('category.id = :id', { id })
        .andWhere('translate.lang = :lang', { lang: trans.lang })
        .getOne();
      if (translate.id) {
        await this.categoryTranslationRepository.save({
          ...trans,
          id: translate.id,
        });
      }
    });

    const trans = this.categoryTranslationRepository.create(data);
    await this.categoryTranslationRepository.save(trans);

    await this.categoryRepository.save(cate);

    return cate;
  }
}
