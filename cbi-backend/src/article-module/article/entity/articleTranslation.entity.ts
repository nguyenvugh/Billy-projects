import { LangEnum } from 'src/common/constants/global.constant';
import { ColumnString } from 'src/common/decorators/custom-column.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';

@Entity('article-translations')
export class ArticleTranslation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lang', enum: LangEnum, default: LangEnum.En })
  lang: LangEnum;

  @Column({ name: 'title' })
  @Index()
  title: string;

  // not fix all column
  @Column({ charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  @Index()
  content: string;

  @Column({ name: 'article_id' })
  articleId: string;

  @Column()
  description: string;

  @ManyToOne(() => Article, (ac) => ac.translates, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article: Article;

  @ColumnString({ unique: true })
  @Index()
  slug: string;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
