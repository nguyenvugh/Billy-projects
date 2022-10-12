import { Transform } from 'class-transformer';
import { InventoryCity } from './inventory-city.entity';

export class ListInventoryCitiesEntity {
  @Transform((value) => value.value.map((el) => new InventoryCity(el)))
  results: InventoryCity[];

  constructor(partial: Partial<ListInventoryCitiesEntity>) {
    Object.assign(this, partial);
  }
}
