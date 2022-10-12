import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article-module/article/service/article.service';
import { AdminJwtDto } from 'src/auth/dto/admin-jwt.dto';
import { LangEnum } from 'src/common/constants/global.constant';
import {
  BadRequestExc,
  NotFoundExc,
} from 'src/common/exceptions/custom.exception';
import { TranslateService } from 'src/utils-module/service/translate.service';
import { DeepPartial, In, IsNull, Not } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateArticleCategoryDto } from '../dto/create-article-category.dto';
import { FindArticleCategoryDto } from '../dto/find-article-category.dto';
import { FindMultiArticleCateDto } from '../dto/find-multi-article-category.dto';
import { ArticleCategory } from '../entitiy/article_category.entity';
import { ArticleCategoryTranslation } from '../entitiy/article_cetegory_translation.entity';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategory)
    private readonly articleCateRepo: Repository<ArticleCategory>,
    @InjectRepository(ArticleCategoryTranslation)
    private articleCateTranslateRepo: Repository<ArticleCategoryTranslation>,
    private translateService: TranslateService,
    private articleService: ArticleService,
  ) {}

  async getAllPaging(params: FindMultiArticleCateDto) {
    const { limit: take, page, lang, searchText, creatorId } = params;
    const skip = (page - 1) * take;

    const queryBuilder = this.articleCateRepo.createQueryBuilder('cate');

    const [results, total] = await queryBuilder
      .innerJoinAndSelect(
        'cate.translates',
        'translate',
        'translate.lang = ' + `'${lang}'`,
      )
      .innerJoinAndSelect('cate.creator', 'user')
      .where((qb) => {
        if (searchText)
          qb.andWhere('LOWER(translate.name) LIKE :q', {
            q: `%${searchText.toLowerCase()}%`,
          });
        if (creatorId)
          qb.andWhere('cate.creatorId = :creatorId', { creatorId });
      })
      .orderBy({
        'cate.createdAt': 'DESC',
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return { results, total };
  }

  async create(
    createArticleCategoryDto: CreateArticleCategoryDto,
    admin: AdminJwtDto,
    lang: LangEnum,
  ) {
    const { name } = createArticleCategoryDto;
    await this.validateExistedCateName(lang, name);
    const newArticleCate = this.articleCateRepo.create({
      creatorId: admin.id,
    });

    const newArticleTranslate = this.articleCateTranslateRepo.create({
      lang,
      name,
    });

    newArticleCate.translates = [newArticleTranslate];
    return this.articleCateRepo.save(newArticleCate);
  }

  async findByIds(id: string, lang: LangEnum) {
    const articleCates = await this.articleCateRepo
      .createQueryBuilder('articleCategory')
      .innerJoinAndSelect(
        'articleCategory.translates',
        'translate',
        lang && 'translate.lang = :lang',
        {
          lang,
        },
      )
      .where({
        id,
      })
      .getMany();

    return articleCates;
  }

  async findAll(lang: LangEnum) {
    return await this.articleCateRepo
      .createQueryBuilder('articleCategory')
      .select('articleCategory.id, translate.name')
      .innerJoin(
        'articleCategory.translates',
        'translate',
        lang && 'translate.lang = :lang',
        {
          lang,
        },
      )
      .getRawMany();
  }

  async findOne(id: string, lang: LangEnum) {
    const cate = await this.articleCateRepo
      .createQueryBuilder('articleCategory')
      .leftJoinAndSelect('articleCategory.creator', 'creator')
      .innerJoinAndSelect(
        'articleCategory.translates',
        'translate',
        lang && 'translate.lang = :lang',
        {
          lang,
        },
      )
      .where({
        id,
      })
      .getOne();

    const excLocalize = await this.translateService.t(
      'main.entity.article_category',
    );
    if (!cate) throw new NotFoundExc(excLocalize);
    return cate;
  }

  async update(id: string, name: string, lang: LangEnum) {
    await this.findOneOrError(id);
    await this.validateExistedCateName(lang, name, id);
    const currentCateTrans = await this.articleCateTranslateRepo.findOne({
      lang,
      articleCategoryId: id,
    });
    currentCateTrans.name = name;

    return await this.articleCateTranslateRepo.save(currentCateTrans);
  }

  async remove(id: string) {
    const exist = await this.findOneOrError(id);
    const [resultFist] = await Promise.all([
      this.articleCateRepo.softRemove(exist),
      // this.articleCateTranslateRepo.softDelete({ articleCategoryId: id }),
      // this.articleService.removeJoinByCategory([id]),
    ]);

    const articleLocalize = await this.translateService.t(
      'main.entity.article_category',
    );
    if (!resultFist) throw new NotFoundExc(articleLocalize);
    return;
  }

  async removeMulti(ids: string[]) {
    const [resultFist] = await Promise.all([
      this.articleCateRepo.softDelete({
        id: In(ids),
        deletedAt: IsNull(),
      }),
      // this.articleCateTranslateRepo.softDelete({
      //   articleCategoryId: In(ids),
      //   deletedAt: IsNull(),
      // }),
      // this.articleService.removeJoinByCategory(ids),
    ]);

    // We are only care resultFist affect, not care about resultSecond
    const excLocalize = await this.translateService.t(
      'main.entity.article_category',
    );
    if (!resultFist.affected) throw new NotFoundExc(excLocalize);
    return;
  }

  async findBySlug(slug: string) {
    const exist = await this.articleCateRepo
      .createQueryBuilder('articleCate')
      .innerJoinAndSelect(
        'articleCate.translates',
        'translate',
        'translate.slug = :slug',
        {
          slug,
        },
      )
      .getOne();

    if (!exist) throw new NotFoundExc(slug);
    return exist;
  }

  async findOneOrError(id: string) {
    const exist = await this.articleCateRepo.findOne(id);

    const excLocalize = await this.translateService.t(
      'main.entity.article_category',
    );
    if (!exist) throw new NotFoundExc(excLocalize);
    return exist;
  }

  async validateExistedCateName(
    lang: LangEnum,
    name: string,
    artCateTranId?: string,
  ) {
    let existedName = [];
    if (artCateTranId) {
      existedName = await this.articleCateTranslateRepo.find({
        lang,
        name,
        articleCategoryId: Not(artCateTranId),
      });
    } else {
      existedName = await this.articleCateTranslateRepo.find({
        lang,
        name,
      });
    }

    if (existedName.length > 0) {
      const errorMess = await this.translateService.t(
        'main.entity.article_category_existed_name',
      );
      throw new BadRequestExc(errorMess);
    }
  }
}
