import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { MediaUploadEntity } from '../../media-upload/entities/media-upload.entity';
import { CityEntity } from '../../city/entities/city.entity';
import { DistrictEntity } from '../../district/entities/district.entity';
import { WardEntity } from '../../ward/entities/ward.entity';

export class ShopEntity {
  id: number;

  name: string;

  phone_number: string;

  email: string;

  fax: string;

  lat: string;

  long: string;

  start_working_time: string;

  end_working_time: string;

  start_working_date: number;

  end_working_date: number;

  address: string;

  @Transform((value) => new MediaUploadEntity(value.value))
  thumbnail: MediaUploadEntity;

  @Transform((value) => new CityEntity(value.value))
  city: CityEntity;

  @Transform((value) => new DistrictEntity(value.value))
  district: DistrictEntity;

  @Transform((value) => new WardEntity(value.value))
  ward: WardEntity;

  @Exclude()
  @ApiHideProperty()
  thumbnail_id: number;

  @Exclude()
  @ApiHideProperty()
  city_id: number;

  @Exclude()
  @ApiHideProperty()
  district_id: number;

  @Exclude()
  @ApiHideProperty()
  ward_id: number;

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

  constructor(partial: Partial<ShopEntity>) {
    Object.assign(this, partial);
  }
}
