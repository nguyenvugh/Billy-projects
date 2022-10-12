import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CountryEntity } from '../../country/entities/country.entity';
import { CityEntity } from '../../city/entities/city.entity';
import { DistrictEntity } from '../../district/entities/district.entity';
import { WardEntity } from '../../ward/entities/ward.entity';

export class CustomerAddressEntity {
  id: number;

  name: string;

  address: string;

  alias: string;

  phone_number: string;

  is_default: number;

  @Transform((value) => new CountryEntity(value.value))
  country: CountryEntity;

  @Transform((value) => new CityEntity(value.value))
  city: CountryEntity;

  @Transform((value) => new DistrictEntity(value.value))
  district: CountryEntity;

  @Transform((value) => new WardEntity(value.value))
  ward: CountryEntity;

  @Exclude()
  @ApiHideProperty()
  customerId: number;

  @Exclude()
  @ApiHideProperty()
  countryId: number;

  @Exclude()
  @ApiHideProperty()
  cityId: number;

  @Exclude()
  @ApiHideProperty()
  districtId: number;

  @Exclude()
  @ApiHideProperty()
  wardId: number;

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

  constructor(partial: Partial<CustomerAddressEntity>) {
    Object.assign(this, partial);
  }
}
