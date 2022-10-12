import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ForgetPasswordGenCodeEntity {
  @Exclude()
  @ApiHideProperty()
  id: number;

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

  name: string;

  phone_number: string;

  email: string;

  sex: number;

  birthday: string;

  constructor(partial: Partial<ForgetPasswordGenCodeEntity>) {
    Object.assign(this, partial);
  }
}
