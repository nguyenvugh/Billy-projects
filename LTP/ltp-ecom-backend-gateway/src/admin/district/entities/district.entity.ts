import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class DistrictEntity {
  id: number;

  name: string;

  @Exclude()
  @ApiHideProperty()
  cityId: number;

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

  constructor(partial: Partial<DistrictEntity>) {
    Object.assign(this, partial);
  }
}
