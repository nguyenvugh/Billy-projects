import { Transform } from 'class-transformer';
import { InventoryInputHistoryEntity } from './inventory-input-history.entity';

export class ListInventoryInputHistoriesEntity {
  @Transform((value) =>
    value.value.map((el) => new InventoryInputHistoryEntity(el)),
  )
  results: InventoryInputHistoryEntity[];

  constructor(partial: Partial<ListInventoryInputHistoriesEntity>) {
    Object.assign(this, partial);
  }
}
