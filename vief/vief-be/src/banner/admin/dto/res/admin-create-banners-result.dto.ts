import { Exclude, Expose, Type } from 'class-transformer';
import { AdminGetBannerResultDto } from './admin-get-banner-result.dto';

@Exclude()
export class AdminCreateBannersResultDto {
  @Expose()
  @Type(() => AdminGetBannerResultDto)
  data: AdminGetBannerResultDto[];
}
