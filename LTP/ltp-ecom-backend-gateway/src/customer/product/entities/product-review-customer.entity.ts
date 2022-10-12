import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { MediaUploadEntity } from '../../media-upload/entities/media-upload.entity';

export class ProductReviewCustomerEntity {
  id: number;

  email: string;

  name: string;

  phone_number: string;

  sex: number;

  birthday: string;

  @Transform((value) => new MediaUploadEntity(value.value))
  avatar: MediaUploadEntity;

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

  constructor(partial: Partial<ProductReviewCustomerEntity>) {
    Object.assign(this, partial);
  }
}
