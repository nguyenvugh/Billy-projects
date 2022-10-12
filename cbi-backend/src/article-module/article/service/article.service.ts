import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCategoryService } from 'src/article-module/article-category/service/articleCategory.service';
import { AdminJwtDto } from 'src/auth/dto/admin-jwt.dto';
import { ArticleStatus, LangEnum } from 'src/common/constants/global.constant';
import {
  BadRequestExc,
  NotFoundExc,
} from 'src/common/exceptions/custom.exception';
import { toListResponse } from 'src/common/utils';
import { FileAdminService } from 'src/file/service/file-admin.service';
import { TranslateService } from 'src/utils-module/service/translate.service';
import { Brackets, DeepPartial, In, IsNull, LessThanOrEqual } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { Repository } from 'typeorm/repository/Repository';
import { CreateArticleDto } from '../dto/create-article.dto';
import { FindArticleDto } from '../dto/find-article.dto';
import { FindMultiArticleDto } from '../dto/find-multi-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { Article } from '../entity/article.entity';
import { ArticleTranslation } from '../entity/articleTranslation.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
    @InjectRepository(ArticleTranslation)
    private articleTranslateRepo: Repository<ArticleTranslation>,
    private translateService: TranslateService,
    @Inject(forwardRef(() => ArticleCategoryService))
    private articleCateService: ArticleCategoryService,
    private fileAdminService: FileAdminService,
  ) {}

  async create(createArticleDto: CreateArticleDto, admin: AdminJwtDto) {
    const {
      lang,
      title,
      content,
      idCategory,
      isFeature,
      status,
      publishAt,
      thumbnailId,
      authorName,
      description,
    } = createArticleDto;

    await this.validateExistedArticleByTitleAndLang(title, lang);
    const articleCategories = await this.articleCateService.findByIds(
      idCategory,
      lang,
    );

    if (!articleCategories.length) throw new BadRequestExc();

    // Validate thumbnail
    await this.fileAdminService.findOneOrError(thumbnailId);

    const newArticle = this.articleRepo.create({
      publishAt,
      isFeature,
      status,
      thumbnailId: thumbnailId,
      creatorId: admin.id,
      authorName,
      articleCategory: articleCategories[0],
      description,
    });

    const newArticleTranslate = this.articleTranslateRepo.create({
      lang,
      title,
      content,
      description,
    });

    // const articleToCats = articleCategories.map((category) => {
    //   return this.articleToCategoryRepo.create({
    //     category,
    //   });
    // });

    // Save article before create new row to Join table.
    newArticle.translates = [newArticleTranslate];
    // newArticle.articleToCategories = articleToCats;
    return await this.articleRepo.save(newArticle);
  }

  async validateExistedArticleByTitleAndLang(title: string, lang: LangEnum) {
    const existedArticle = await this.articleTranslateRepo.findOne({
      where: { title, lang, deletedAt: IsNull() },
    });
    if (existedArticle) throw new BadRequestExc('Article already exists!');
  }

  async getAllPaging(params: FindMultiArticleDto) {
    const {
      limit: take,
      page,
      lang,
      searchText,
      status,
      adminId,
      idCategory,
      isFeature,
    } = params;
    const skip = (page - 1) * take;

    const opts: FindConditions<Article> = {
      ...(isFeature && { isFeature }),
      ...(status && { status }),
      ...(adminId && { adminId }),
    };

    const qb = this.articleRepo.createQueryBuilder('article');
    qb.innerJoinAndSelect(
      'article.translates',
      'translate',
      lang && 'translate.lang = :langTranslate',
      {
        langTranslate: lang,
      },
    )
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.articleCategory', 'category')
      // .innerJoinAndSelect(
      //   'article.articleToCategories',
      //   'articleToCategory',
      //   // categoryId && 'articleToCategory.article_category_id = :categoryId',
      //   // { categoryId },
      //   idCategory && 'articleToCategory.article_category_id IN(...ids)',
      //   { idCategory },
      // )
      // .leftJoinAndSelect('articleToCategory.category', 'category')
      .leftJoinAndSelect(
        'category.translates',
        'categoryTranslate',
        lang && 'categoryTranslate.lang = :langCate',
        {
          langCate: lang,
        },
      )
      .where(
        new Brackets((qb) => {
          qb.where(opts);
          if (idCategory)
            qb.andWhere('category.id = :category', { category: idCategory });
          if (searchText)
            qb.andWhere('LOWER(translate.title) LIKE :q', {
              q: `%${searchText.toLowerCase()}%`,
            });
        }),
      )
      .orderBy({
        'article.createdAt': 'DESC',
      })
      .skip(skip)
      .take(take);

    const [results, total] = await Promise.all([qb.getMany(), qb.getCount()]);
    return toListResponse(results, total, take);
  }

  async findByIds(ids: number[]) {
    const articles = await this.articleRepo
      .createQueryBuilder('article')
      // .innerJoinAndSelect(
      //   'article.translates',
      //   'translate',
      //   lang && 'translate.lang = :lang',
      //   {
      //     lang,
      //   },
      // )
      .where({
        id: In(ids),
      })
      .getMany();

    return articles;
  }

  async findOne(id: string, params: FindArticleDto) {
    const { lang } = params;
    const exist = await this.articleRepo
      .createQueryBuilder('article')
      .innerJoinAndSelect(
        'article.translates',
        'articleTranslate',
        lang && 'articleTranslate.lang = :langTranslate',
        {
          langTranslate: lang,
        },
      )
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.articleCategory', 'category')
      // .leftJoinAndSelect('article.articleToCategories', 'articleToCategory')
      // .leftJoinAndSelect('articleToCategory.category', 'category')
      .leftJoinAndSelect(
        'category.translates',
        'categoryTranslate',
        lang && 'categoryTranslate.lang = :langCate',
        {
          langCate: lang,
        },
      )
      .where({
        id,
      })
      .getOne();

    // Translate Article i18n here.
    const articleLocalize = await this.translateService.t(
      'main.entity.article',
    );

    if (!exist) throw new NotFoundExc(articleLocalize);
    return exist;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
    admin: AdminJwtDto,
  ) {
    const {
      lang,
      title,
      content,
      idCategory,
      isFeature,
      status,
      publishAt,
      thumbnailId,
      authorName,
      description,
    } = updateArticleDto;

    //Validate first.
    await this.findOneOrError(id);
    if (thumbnailId) await this.fileAdminService.findOneOrError(thumbnailId);

    const payloadTranslate: DeepPartial<ArticleTranslation> = {
      articleId: id,
      lang,
      content,
      title,
      description,
    };

    let isModifyTranslate = false;
    if (content || title) {
      isModifyTranslate = true;
      // If one of exist, user want to create/update translate
      const existTranslation = await this.articleTranslateRepo.findOne({
        lang,
        articleId: id,
      });

      // Base on value exist translation we will update or translate.
      if (existTranslation) {
        payloadTranslate.id = existTranslation.id;
      } else {
        if (!content && !title) {
          throw new BadRequestExc();
        }
      }
    }

    // 2.Update Category: Check if array id category is exist, if yes, add it on categories
    const payloadArticle: DeepPartial<Article> = {
      id,
      isFeature,
      status,
      publishAt,
      thumbnailId: thumbnailId,
      creatorId: admin.id,
      authorName,
      description,
    };

    if (idCategory) {
      const categories = await this.articleCateService.findByIds(
        idCategory,
        lang,
      );
      if (!categories.length) throw new BadRequestExc();

      // const articleToCategories = categories.map((cate) => {
      //   const payloadJoinTable: DeepPartial<ArticleToCategory> = {
      //     articleCategoryId: cate.id,
      //   };
      //   return payloadJoinTable;

      //   // Use below if you want to listen subcriber event.
      //   // return this.articleToCategoryRepo.create(payloadJoinTable);
      // });

      // payloadArticle.articleToCategories = articleToCategories;
    }

    await Promise.all([
      this.articleRepo.save(payloadArticle),
      isModifyTranslate && this.articleTranslateRepo.save(payloadTranslate),
    ]);

    return await this.findOne(id, { lang });
  }

  async changeStatus(id: string) {
    const article = await this.articleRepo.findOne(id);

    article.status =
      article.status === ArticleStatus.PUBLISH
        ? ArticleStatus.DRAFT
        : ArticleStatus.PUBLISH;

    return await this.articleRepo.save(article);
  }

  async deleteArticleByIds(ids: string[]) {
    const [resultFist] = await Promise.all([
      this.articleRepo.softDelete({ id: In(ids), deletedAt: IsNull() }),
      this.articleTranslateRepo.softDelete({
        articleId: In(ids),
        deletedAt: IsNull(),
      }),
    ]);

    const articleLocalize = await this.translateService.t(
      'main.entity.article',
    );
    if (!resultFist.affected) throw new NotFoundExc(articleLocalize);
    return;
  }

  async findOneOrError(id: string) {
    const exist = await this.articleRepo.findOne(id);
    const articleLocalize = await this.translateService.t(
      'main.entity.article',
    );
    if (!exist) throw new NotFoundExc(articleLocalize);
    return exist;
  }

  async findOneWith(opts: FindConditions<Article>) {
    const exist = await this.articleRepo.findOne({
      where: opts,
    });
    return exist;
  }

  async findBySlug(slug: string, lang: string) {
    const opts: FindConditions<Article> = {
      status: ArticleStatus.PUBLISH,
    };

    const existArticle = await this.articleRepo
      .createQueryBuilder('article')
      .innerJoinAndSelect(
        'article.translates',
        'translate',
        'translate.slug = :slug',
        {
          slug,
        },
      )
      .leftJoinAndSelect('article.thumbnail', 'thumbnail')
      .leftJoinAndSelect('article.articleCategory', 'category')
      // .leftJoinAndSelect('article.articleToCategories', 'articleToCategory')
      // .leftJoinAndSelect('articleToCategory.category', 'category')
      .leftJoinAndSelect(
        'category.translates',
        'categoryTranslate',
        lang && 'categoryTranslate.lang = :langCate',
        {
          langCate: lang,
        },
      )
      .where((qb) => {
        qb.where(opts);
        qb.andWhere('translate.lang = :lang', { lang });
      })
      .getOne();

    if (!existArticle) throw new NotFoundExc(slug);

    return existArticle;
  }

  async checkIsFullPublishedArticle(lang: LangEnum) {
    const countArticlePublished = await this.articleRepo
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.translates', 'translate')
      .where('article.is_feature = :feature ', { feature: 1 })
      .andWhere('translate.lang = :lang', { lang })
      .andWhere('translate.deleted_at IS NULL')
      .getCount();

    const MAX_PUBLISH_NUMBER = 4;
    return { isFullPublished: countArticlePublished >= MAX_PUBLISH_NUMBER };
  }
}
