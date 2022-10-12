import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class InventoryEntity {
  @Exclude()
  @ApiHideProperty()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted_at: Date;

  @Exclude()
  @ApiHideProperty()
  deleted: number;

  @Exclude()
  @ApiHideProperty()
  deleted_by: number;

  constructor(partial: Partial<InventoryEntity>) {
    Object.assign(this, partial);
  }
}
