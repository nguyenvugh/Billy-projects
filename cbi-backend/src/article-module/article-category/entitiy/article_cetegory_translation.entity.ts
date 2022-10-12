import {
  LangEnum,
  NameConstraintEntity,
} from 'src/common/constants/global.constant';
import { ColumnString } from 'src/common/decorators/custom-column.decorator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { getEnumStr } from 'src/common/utils';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleCategory } from './article_category.entity';

@Entity('article-category-translations')
@Unique(`${NameConstraintEntity.UQ_ARTICLE_CATE_TRANSLATE_1}`, [
  'articleCategoryId',
  'lang',
])
@Check(
  `${NameConstraintEntity.CHK_ARTICLE_CATE_TRANSLATE_1}`,
  `"lang" IN (${getEnumStr(LangEnum)})`,
)
export class ArticleCategoryTranslation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lang', enum: LangEnum, default: LangEnum.En })
  lang: LangEnum;

  @Column({ name: 'name' })
  @Index()
  name: string;

  @Column({ name: 'article_category_id' })
  articleCategoryId: string;

  @ManyToOne(() => ArticleCategory, (ac) => ac.translates, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'article_category_id' })
  articleCategory: ArticleCategory;

  @ColumnString({ unique: true })
  @Index()
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
