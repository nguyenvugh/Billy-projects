import { Type, Exclude, Expose } from 'class-transformer';
import { AdminGetBannerResultDto } from './admin-get-banner-result.dto';

@Exclude()
export class AdminGetBannerDetailResultDto {
  @Expose()
  @Type(() => AdminGetBannerResultDto)
  data: AdminGetBannerResultDto;
}
