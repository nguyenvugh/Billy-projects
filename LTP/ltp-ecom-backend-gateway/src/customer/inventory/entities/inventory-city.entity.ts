import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class InventoryCity {
  inventory_city_id: number;

  inventory_city_name: string;

  @Exclude()
  @ApiHideProperty()
  inventory_city_country: number;

  @Exclude()
  @ApiHideProperty()
  inventory_city_created_at: Date;

  @Exclude()
  @ApiHideProperty()
  inventory_city_updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  inventory_city_deleted_at: Date;

  @Exclude()
  @ApiHideProperty()
  inventory_city_deleted: number;

  @Exclude()
  @ApiHideProperty()
  inventory_city_deleted_by: number;

  constructor(partial: Partial<InventoryCity>) {
    Object.assign(this, partial);
  }
}
