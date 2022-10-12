import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../constants/global.constant';

export class UpdatedByResultDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @Exclude()
  @ApiHideProperty()
  email: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @Exclude()
  @ApiHideProperty()
  phone_number: string;

  @Exclude()
  @ApiHideProperty()
  birthday: string;

  @Exclude()
  @ApiHideProperty()
  reset_password_token: string;

  @Exclude()
  @ApiHideProperty()
  status_lock: BooleanStatusEnum;

  @Exclude()
  @ApiHideProperty()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  created_by: string;

  @Exclude()
  @ApiHideProperty()
  updated_at: Date;

  @Exclude()
  @ApiHideProperty()
  updated_by: string;
}
