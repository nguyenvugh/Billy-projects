import { Transform } from 'class-transformer';
import { CityEntity } from './city.entity';

export class ListCitiesEntity {
  @Transform((value) => value.value.map((el) => new CityEntity(el)))
  results: CityEntity[];

  constructor(partial: Partial<ListCitiesEntity>) {
    Object.assign(this, partial);
  }
}
