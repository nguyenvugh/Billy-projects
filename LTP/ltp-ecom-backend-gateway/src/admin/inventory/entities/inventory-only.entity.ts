import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CityEntity } from '../../city/entities/city.entity';
import { CountryEntity } from '../../country/entities/country.entity';
import { DistrictEntity } from '../../district/entities/district.entity';
import { WardEntity } from '../../ward/entities/ward.entity';

export class InventoryOnlyEntity {
  id: number;

  name: string;

  address: string;

  phone_number: string;

  lat: number;

  lng: number;

  @Transform((value) => new CountryEntity(value.value))
  country: CountryEntity;

  @Transform((value) => new CityEntity(value.value))
  city: CityEntity;

  @Transform((value) => new DistrictEntity(value.value))
  district: DistrictEntity;

  @Transform((value) => new WardEntity(value.value))
  ward: WardEntity;

  @Exclude()
  @ApiHideProperty()
  country_id: number;

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

  constructor(partial: Partial<InventoryOnlyEntity>) {
    Object.assign(this, partial);
  }
}
