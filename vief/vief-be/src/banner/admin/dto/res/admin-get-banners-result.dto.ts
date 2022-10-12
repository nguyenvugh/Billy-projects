import { Exclude, Expose, Type } from 'class-transformer';
import { AdminGetBannerResultDto } from './admin-get-banner-result.dto';

@Exclude()
export class AdminGetBannersResultDto {
  @Expose()
  @Type(() => AdminGetBannerResultDto)
  data: AdminGetBannerResultDto[];

  @Expose()
  total: number;
}
