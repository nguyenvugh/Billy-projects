import { ArticleCategory } from 'src/article-module/article-category/entitiy/article_category.entity';
import { User } from 'src/auth/entities/user.entity';
import {
  ArticleStatus,
  BooleanEnum,
} from 'src/common/constants/global.constant';
import { BaseEntity } from 'src/common/entities/base.entity';
import { FileAdmin } from 'src/file/entities/file-admin.entity';
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
import { ArticleToCategory } from './articleToCategory.entity';
import { ArticleTranslation } from './articleTranslation.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'publish_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  publishAt: Date;

  @Column({ name: 'is_feature', enum: BooleanEnum, default: BooleanEnum.FALSE })
  isFeature: BooleanEnum;

  @Column({ name: 'status', enum: ArticleStatus, default: ArticleStatus.DRAFT })
  status: ArticleStatus;

  @Column({ name: 'thumbnail_id' })
  thumbnailId: string;

  @Column()
  description: string;

  @ManyToOne(() => FileAdmin)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: FileAdmin;

  @OneToMany(
    () => ArticleTranslation,
    (articleTranslation) => articleTranslation.article,
    {
      cascade: ['insert', 'update'],
    },
  )
  translates: ArticleTranslation[];

  @OneToMany(
    () => ArticleToCategory,
    (articleToCategory) => articleToCategory.articleCategoryId,
    { cascade: ['insert', 'update'] },
  )
  articleToCategories: ArticleToCategory[];

  @Column({ name: 'author_name' })
  authorName: string;
  @Column({ name: 'creator_id' })
  creatorId: string;

  @ManyToOne(() => User, (u) => u.articles)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(
    () => ArticleCategory,
    (articleCategory) => articleCategory.articles,
    { cascade: ['insert', 'update', 'soft-remove'] },
  )
  @JoinColumn({ name: 'article_category_id' })
  articleCategory: ArticleCategory;
}
