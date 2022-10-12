import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class RegisterEntity {
  @Exclude()
  @ApiHideProperty()
  password: string;

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

  @Exclude()
  @ApiHideProperty()
  reset_password_code: string;

  @Exclude()
  @ApiHideProperty()
  reset_password_expire: Date;

  @Exclude()
  @ApiHideProperty()
  activation_code: string;

  @Exclude()
  @ApiHideProperty()
  activation_expire: Date;

  id: number;

  name: string;

  phone_number: string;

  email: string;

  sex: number;

  birthday: string;

  access_token: string;

  constructor(partial: Partial<RegisterEntity>) {
    Object.assign(this, partial);
  }
}
