import { Injectable } from '@nestjs/common';
import { In, IsNull } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoryService } from '../category/category.service';
import { LangEnum } from '../common/constants/global.constant';
import {
  ConflictExc,
  NotFoundExc,
} from '../common/exceptions/custom.exception';
import { getPagingParams, validateDuplicateByField } from '../common/utils';
import { FileService } from '../file/file.service';
import { CreateArticleDto } from './dto/req/admin/create-article.dto';
import { EditArticleDto } from './dto/req/admin/edit-article.dto';
import { GetListArticleDto } from './dto/req/admin/get-list-articles.dto';
import { GetListArticleByClientDto } from './dto/req/client/get-list-article.dto';
import { ArticleTranslationRepository } from './repository/article-translation.repository';
import { ArticleRepository } from './repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private articleTranslationRepository: ArticleTranslationRepository,
    private fileService: FileService,
    private categoryService: CategoryService,
  ) {}

  @Transactional()
  async createArticle(createArticle: CreateArticleDto) {
    const {
      categoryId,
      thumbnailId,
      images,
      isFeature,
      field,
      author,
      translations,
    } = createArticle;

    validateDuplicateByField('lang', translations);
    validateDuplicateByField('slug', translations);

    const arrSlug = translations.map((trans) => trans.slug);
    const isExitBySlug = await this.articleTranslationRepository.find({
      where: {
        slug: In(arrSlug),
      },
    });

    if (isExitBySlug.length > 0) throw new ConflictExc('slug already exists');

    const category = await this.categoryService.getCategoryById(categoryId);

    if (!category) throw new NotFoundExc();

    const thumbnail = await this.fileService.findOneOrError(thumbnailId);

    const imgs = await this.fileService.findManyOrError(images);

    const article = this.articleRepository.create({
      category,
      field,
      isFeature,
      author,
      thumbnail,
      images: imgs,
    });
    await this.articleRepository.save(article);
    const data = translations.map((item) => {
      return {
        ...item,
        article,
      };
    });
    const trans = await this.articleTranslationRepository.create(data);
    await this.articleTranslationRepository.insert(trans);

    return article;
  }

  async getArticleById(id: number) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.images', 'images')
      .leftJoinAndSelect('article.translates', 'translates')
      .leftJoinAndSelect('article.category', 'category')
      .where({
        id: id,
        deletedAt: IsNull(),
      })
      .getOne();

    if (!article) throw new NotFoundExc();

    return article;
  }

  async getListArticleByAdmin(getListArticle: GetListArticleDto) {
    const { page, size, title, type, ...rest } = getListArticle;
    const { take, skip } = getPagingParams(page, size);
    const [data, total] = await this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.translates', 'translates')
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.images', 'images')
      .leftJoinAndSelect('article.category', 'category')
      .innerJoinAndSelect('category.translates', 'translatesCate')
      .where((qb) => {
        qb.where({
          ...rest,
        })
          .andWhere('translates.lang = :lang', { lang: LangEnum.Vi })
          .andWhere('translatesCate.lang = :lang', { lang: LangEnum.Vi })
          .andWhere('article.deletedAt isnull');
        if (title) {
          qb.where('translates.title LIKE :title', { title: `%${title}%` })
            .andWhere('translates.lang = :lang', { lang: LangEnum.Vi })
            .andWhere('article.deletedAt isnull');
        }
        if (type) {
          qb.andWhere('category.type = :type', { type });
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

  async getListArticleByClient(
    getListArticle: GetListArticleByClientDto,
    lang: LangEnum,
  ) {
    const { page, size, title, slugCategory, type, ...c } = getListArticle;
    const { take, skip } = getPagingParams(page, size);

    const language = lang ? lang : LangEnum.Vi;

    const [data, total] = await this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.translates', 'translates')
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.category', 'category')
      .innerJoinAndSelect('category.translates', 'translatesCate')
      .where((qb) => {
        qb.where({
          ...c,
        })
          .andWhere('translates.lang = :lang', { lang: language })
          .andWhere('translatesCate.lang = :lang', { lang: language })
          .andWhere('article.deletedAt isnull');
        if (title) {
          qb.where('translates.title LIKE :title', { title: `%${title}%` })
            .andWhere('translates.lang = :lang', { lang: language })
            .andWhere('article.deletedAt isnull');
        }
        if (slugCategory) {
          qb.andWhere('translatesCate.slug = :slugCategory', {
            slugCategory: slugCategory,
          });
        }
        if (type) {
          qb.andWhere('category.type = :type', { type });
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

  async getArticleBySlug(slug: string, lang: LangEnum) {
    const language = lang ? lang : LangEnum.Vi;
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.images', 'images')
      .innerJoinAndSelect('article.translates', 'translates')
      .leftJoinAndSelect('article.category', 'category')
      .innerJoinAndSelect('category.translates', 'translatesCate')
      .where('translates.slug = :slug', { slug })
      .andWhere('translates.lang = :lang', { lang: language })
      .andWhere('translates.deletedAt isnull')
      .andWhere('translatesCate.lang = :lang', { lang: language })
      .getOne();

    if (!article) throw new NotFoundExc();

    return {
      article: article,
      category: article.category,
    };
  }
  @Transactional()
  async deleteArticles(id: number[]) {
    const data = await this.articleTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.article', 'article')
      .where('article.id IN (:...id)', { id })
      .getMany();
    const ids = data.map((i) => i.id);

    if (ids.length > 0) {
      const resultTrans = await this.articleTranslationRepository.softDelete(
        ids,
      );

      if (!resultTrans.affected) {
        throw new NotFoundExc('translate');
      }
    }

    const resultArticle = await this.articleRepository.softDelete({
      id: In(id),
    });
    if (!resultArticle.affected) throw new NotFoundExc('article');
    return resultArticle;
  }
  @Transactional()
  async editArticle(editArticle: EditArticleDto, id: number) {
    const { translations, thumbnailId, images, categoryId } = editArticle;
    validateDuplicateByField('lang', translations);
    validateDuplicateByField('slug', translations);

    const thumbnail = await this.fileService.findOneOrError(thumbnailId);
    const imgs = await this.fileService.findManyOrError(images);
    let art = await this.articleRepository.findOne({
      where: {
        id,
      },
    });
    if (!art) throw new NotFoundExc();
    const cate = await this.categoryService.getCategoryById(categoryId);

    art = {
      ...art,
      ...editArticle,
      thumbnail,
      images: imgs,
      category: cate,
    };

    const translate = await this.articleTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.article', 'article')
      .where('article.id = :id', { id: art.id })
      .getMany();

    const transNotExitLang = [];
    translations.forEach((trans, index) => {
      if (!translate.map((t) => t.lang).includes(trans.lang)) {
        transNotExitLang.push(trans);
        translations.splice(index, 1);
      }
    });

    const listTransId = await this.articleTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.article', 'article')
      .where('translate.slug IN (:...slugs)', {
        slugs: translations.map((translation) => translation.slug),
      })
      .andWhere('article.id = :id', { id })
      .getMany();

    const isExitBySlug = await this.articleTranslationRepository
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
        article: art,
      };
    });

    translations.forEach(async (trans) => {
      const translate = await this.articleTranslationRepository
        .createQueryBuilder('translate')
        .leftJoinAndSelect('translate.article', 'article')
        .where('article.id = :id', { id })
        .andWhere('translate.lang = :lang', { lang: trans.lang })
        .getOne();
      if (translate.id) {
        await this.articleTranslationRepository.save({
          ...trans,
          id: translate.id,
        });
      }
    });

    const trans = this.articleTranslationRepository.create(data);
    await this.articleTranslationRepository.save(trans);

    await this.articleRepository.save(art);
    return art;
  }
}
