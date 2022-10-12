import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ProductCategoryImageEntity {
  id: number;

  name: string;

  url: string;

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

  constructor(partial: Partial<ProductCategoryImageEntity>) {
    Object.assign(this, partial);
  }
}
