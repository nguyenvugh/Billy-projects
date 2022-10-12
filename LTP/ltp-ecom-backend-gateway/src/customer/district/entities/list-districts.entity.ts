import { Transform } from 'class-transformer';
import { DistrictEntity } from './district.entity';

export class ListDistrictsEntity {
  @Transform((value) => value.value.map((el) => new DistrictEntity(el)))
  results: DistrictEntity[];

  constructor(partial: Partial<ListDistrictsEntity>) {
    Object.assign(this, partial);
  }
}
