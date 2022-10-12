import { ArticleCategory } from 'src/article-module/article-category/entitiy/article_category.entity';
import { NameConstraintEntity } from 'src/common/constants/global.constant';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Article } from './article.entity';

@Entity('article-to-category')
@Index(
  `${NameConstraintEntity.IDX_ARTICLE_TO_CATEGORY_1}`,
  ['articleId', 'articleCategoryId'],
  {
    unique: true,
    where: 'deleted_at IS NULL',
  },
)
export class ArticleToCategory extends BaseEntity {
  @PrimaryColumn({ name: 'article_id' })
  articleId: string;

  @PrimaryColumn({ name: 'article_category_id' })
  articleCategoryId: string;

  // @ManyToOne(() => Article, (article) => article.articleToCategories, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   orphanedRowAction: 'delete',
  // })
  // @JoinColumn({ name: 'article_id' })
  // article: Article;

  // @ManyToOne(
  //   () => ArticleCategory,
  //   (category) => category.articleToCategories,
  //   {
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE',
  //     orphanedRowAction: 'delete',
  //   },
  // )
  // @JoinColumn({ name: 'article_category_id' })
  // category: ArticleCategory;
}
