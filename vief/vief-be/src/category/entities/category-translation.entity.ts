import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import {
  LangEnum,
  NameConstraintEntity,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { Category } from './category.entity';

@Entity('category_translation')
@Unique(NameConstraintEntity.UQ_SLUG_CATEGORY, ['slug', 'deletedAt'])
export class CategoryTranslation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LangEnum })
  lang: LangEnum;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  shortDesc: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Category, (category: Category) => category.translates, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
