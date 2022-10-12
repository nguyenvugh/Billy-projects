import { Transform } from 'class-transformer';
import { InventoryOnlyEntity } from './inventory-only.entity';

export class ListInventoriesOnlyEntity {
  @Transform((value) => value.value.map((el) => new InventoryOnlyEntity(el)))
  results: InventoryOnlyEntity[];

  constructor(partial: Partial<ListInventoriesOnlyEntity>) {
    Object.assign(this, partial);
  }
}
