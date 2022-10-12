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
  name: 'news_translates',
})
export class NewsTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'news', type: 'int' })
  news: number;

  @ManyToOne(() => News, (news) => news.translates)
  @Index()
  @JoinColumn([
    {
      name: 'news',
      referencedColumnName: 'id',
    },
  ])
  news_obj: News;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
