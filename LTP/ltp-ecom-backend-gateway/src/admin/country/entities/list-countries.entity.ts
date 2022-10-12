import { Transform } from 'class-transformer';
import { CountryEntity } from './country.entity';

export class ListCountriesEntity {
  @Transform((value) => value.value.map((el) => new CountryEntity(el)))
  results: CountryEntity[];

  constructor(partial: Partial<ListCountriesEntity>) {
    Object.assign(this, partial);
  }
}
