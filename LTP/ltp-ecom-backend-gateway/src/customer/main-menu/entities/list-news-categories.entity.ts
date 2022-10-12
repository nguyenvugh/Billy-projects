import { Transform } from 'class-transformer';
import { NewsCategoryEntity } from './news-category.entity';

export class ListNewsCategoriesEntity {
  @Transform((value) => value.value.map((el) => new NewsCategoryEntity(el)))
  results: NewsCategoryEntity[];

  constructor(partial: Partial<ListNewsCategoriesEntity>) {
    Object.assign(this, partial);
  }
}
