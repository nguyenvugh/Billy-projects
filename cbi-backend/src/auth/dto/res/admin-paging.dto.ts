import { Exclude, Expose, Type } from 'class-transformer';
import { EUserStatus } from 'src/common/constants/global.constant';
import { AdminDTO } from './admin.dto';

@Exclude()
export class AdminPagingDTO {
  @Expose()
  @Type(() => AdminDTO)
  results: AdminDTO[];

  @Expose()
  total: number;

  constructor(partial: Partial<AdminDTO>) {
    Object.assign(this, partial);
  }
}
