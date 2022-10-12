import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { News } from './news.schema';

@Entity({
  name: 'news_slug_histories',
})
export class NewsSlugHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'news', type: 'int' })
  news_id: number;

  @ManyToOne(() => News, (news) => news.translates)
  @JoinColumn([
    {
      name: 'news',
    },
  ])
  news: News;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ type: 'mediumtext' })
  slug: string;
}
