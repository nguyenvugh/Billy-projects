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
  name: 'news_category_slug_histories',
})
export class NewsCategorySlugHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'news_category', type: 'int' })
  news_category_id: number;

  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.translates)
  @JoinColumn([
    {
      name: 'news_category',
    },
  ])
  news_category: NewsCategory;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ type: 'mediumtext' })
  slug: string;
}
