import { Transform } from 'class-transformer';
import { OfficeEntity } from './office.entity';

export class ListOfficesEntity {
  @Transform((value) => value.value.map((el) => new OfficeEntity(el)))
  results: OfficeEntity[];

  constructor(partial: Partial<ListOfficesEntity>) {
    Object.assign(this, partial);
  }
}
