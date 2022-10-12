import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { NewsCategoryTranslate } from './news-category-translate.schema';
import { News } from '../../news/schemas/news.schema';

@Entity({
  name: 'news_categories',
})
export class NewsCategory extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  order: number;

  @OneToMany(() => News, (item) => item.category, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  news: News[];

  @OneToMany(
    () => NewsCategoryTranslate,
    (newsCategoryTranslate) => newsCategoryTranslate.category,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  translates: NewsCategoryTranslate[];
}
