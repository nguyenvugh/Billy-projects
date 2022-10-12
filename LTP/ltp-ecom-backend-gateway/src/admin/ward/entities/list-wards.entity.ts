import { Transform } from 'class-transformer';
import { WardEntity } from './ward.entity';

export class ListWardsEntity {
  @Transform((value) => value.value.map((el) => new WardEntity(el)))
  results: WardEntity[];

  constructor(partial: Partial<ListWardsEntity>) {
    Object.assign(this, partial);
  }
}
