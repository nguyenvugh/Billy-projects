import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { NewsCategory } from './news-category.schema';

@Entity({
  name: 'news_category_translates',
})
export class NewsCategoryTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'news_category', type: 'int' })
  news_category: number;

  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.translates)
  @Index()
  @JoinColumn([
    {
      name: 'news_category',
      referencedColumnName: 'id',
    },
  ])
  category: NewsCategory;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
