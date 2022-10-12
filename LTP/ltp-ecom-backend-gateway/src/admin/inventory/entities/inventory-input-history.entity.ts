import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { InventoryOnlyEntity } from './inventory-only.entity';
import { AdminEntity } from './admin.entity';
import { InventoryInputHistoryDetailEntity } from './inventory-input-history-detail.entity';

export class InventoryInputHistoryEntity {
  id: number;

  code: string;

  @Transform((value) => new InventoryOnlyEntity(value.value))
  inventory: InventoryOnlyEntity;

  created_at: Date;

  @Transform((value) => new AdminEntity(value.value))
  created_by: AdminEntity;

  @Transform((value) => new AdminEntity(value.value))
  updated_by: AdminEntity;

  @Transform((value) =>
    value.value.map((el) => new InventoryInputHistoryDetailEntity(el)),
  )
  details: InventoryInputHistoryDetailEntity[];

  @Exclude()
  @ApiHideProperty()
  inventory_id: number;

  @Exclude()
  @ApiHideProperty()
  created_by_id: number;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_by_id: number;

  @Exclude()
  @ApiHideProperty()
  deleted_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted: number;

  @Exclude()
  @ApiHideProperty()
  deleted_by: number;

  constructor(partial: Partial<InventoryInputHistoryEntity>) {
    Object.assign(this, partial);
  }
}
