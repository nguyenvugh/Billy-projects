import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import {
  LangEnum,
  NameConstraintEntity,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { Article } from './article.entity';

@Entity('article_translation')
@Unique(NameConstraintEntity.UQ_SLUG_ARTICLE, ['slug', 'deletedAt'])
export class ArticleTranslation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LangEnum })
  lang: LangEnum;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  shortDesc: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Article, (article: Article) => article.translates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article: Article;
}
