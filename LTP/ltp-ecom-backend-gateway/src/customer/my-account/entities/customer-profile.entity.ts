import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { MediaUploadEntity } from '../../media-upload/entities/media-upload.entity';
import { CustomerSocialAccountEntity } from './customer-social-account.entity';

export class CustomerProfileEntity {
  @Exclude()
  @ApiHideProperty()
  id: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @Exclude()
  @ApiHideProperty()
  avatar_id: number;

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

  name: string;

  phone_number: string;

  email: string;

  sex: number;

  birthday: string;

  @Transform((value) => new MediaUploadEntity(value.value))
  avatar: MediaUploadEntity;

  @Transform((value) =>
    value.value.map((el) => new CustomerSocialAccountEntity(el)),
  )
  customer_socials: CustomerSocialAccountEntity[];

  constructor(partial: Partial<CustomerProfileEntity>) {
    Object.assign(this, partial);
  }
}
