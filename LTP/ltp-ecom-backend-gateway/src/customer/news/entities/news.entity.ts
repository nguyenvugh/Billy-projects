import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { MediaUploadEntity } from '../../media-upload/entities/media-upload.entity';

export class NewsEntity {
  id: number;

  name: string;

  author: string;

  thumbnail: number;

  category: number;

  status: number;

  features: number;

  @Transform((value) => new MediaUploadEntity(value.value))
  thumbnail_obj: MediaUploadEntity;

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
  scheduled_at: Date;

  constructor(partial: Partial<NewsEntity>) {
    Object.assign(this, partial);
  }
}
