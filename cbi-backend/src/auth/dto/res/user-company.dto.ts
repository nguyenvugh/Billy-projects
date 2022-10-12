import { Exclude, Expose } from 'class-transformer';
import {
  BooleanStatusEnum,
  EUserStatus,
} from 'src/common/constants/global.constant';

@Exclude()
export class UserCompanyDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  position: string;

  @Expose()
  numberEmployees: number;

  @Expose()
  revenue: number;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  website: string;

  @Expose()
  workField: string;

  @Expose()
  dateCreateCompany: Date;

  @Expose()
  numUnofficialEmployees: number;

  @Expose()
  modelManufactoring: string;

  @Expose()
  sizeManufactoring: string;

  @Expose()
  materialArea: string;

  @Expose()
  isApplyWorkingDiary: BooleanStatusEnum;

  @Expose()
  isapplyDigital: BooleanStatusEnum;

  constructor(partial: Partial<UserCompanyDTO>) {
    Object.assign(this, partial);
  }
}
