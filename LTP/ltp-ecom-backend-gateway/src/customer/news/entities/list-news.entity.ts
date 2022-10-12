import { Transform } from 'class-transformer';
import { NewsEntity } from './news.entity';

export class ListNewsEntity {
  @Transform((value) => value.value.map((el) => new NewsEntity(el)))
  results: NewsEntity[];

  constructor(partial: Partial<ListNewsEntity>) {
    Object.assign(this, partial);
  }
}
