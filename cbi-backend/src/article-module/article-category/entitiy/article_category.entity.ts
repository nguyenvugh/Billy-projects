import { ArticleToCategory } from 'src/article-module/article/entity/articleToCategory.entity';
import { Article } from 'src/article-module/article/entity/article.entity';
import { User } from 'src/auth/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleCategoryTranslation } from './article_cetegory_translation.entity';

@Entity('article-categories')
export class ArticleCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'creator_id' })
  creatorId: string;

  @ManyToOne(() => User, (u) => u.articleCategories, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(
    () => ArticleCategoryTranslation,
    (articleCateTranslation) => articleCateTranslation.articleCategory,
    {
      cascade: ['insert', 'update'],
    },
  )
  translates: ArticleCategoryTranslation[];

  @ManyToOne(() => Article, (article) => article.articleCategory, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  articles: Article[];

  // @OneToMany(
  //   () => ArticleToCategory,
  //   (articleToCategory) => articleToCategory.category,
  // )
  // articleToCategories: ArticleToCategory[];
}
