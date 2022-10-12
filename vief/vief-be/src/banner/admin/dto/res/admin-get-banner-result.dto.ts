import { Exclude, Expose, Type } from 'class-transformer';
import { AdminGetBannerTranslateResultDto } from './admin-get-banner-translate-result.dto';
import { AdminGetImageResultDto } from '../../../../file/admin/dto/res/admin-get-image-result.dto';

@Exclude()
export class AdminGetBannerResultDto {
  @Expose()
  id: number;

  @Expose()
  sorting: number;

  @Expose()
  @Type(() => AdminGetImageResultDto)
  image: AdminGetImageResultDto;

  @Expose()
  @Type(() => AdminGetBannerTranslateResultDto)
  translates: AdminGetBannerTranslateResultDto[];
}
