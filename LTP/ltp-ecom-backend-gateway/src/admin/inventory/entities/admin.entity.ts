import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class AdminEntity {
  id: number;

  username: string;

  fullname: string;

  sex: number;

  status: number;

  national_id: string;

  phone_number: string;

  address: string;

  @Exclude()
  @ApiHideProperty()
  group: number;

  @Exclude()
  @ApiHideProperty()
  avatar: number;

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

  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
}
