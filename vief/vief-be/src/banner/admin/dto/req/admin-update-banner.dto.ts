import { IntersectionType } from '@nestjs/swagger';
import { AdminUpdateBannerImageDto } from './admin-update-banner-image.dto';
import { AdminUpdateBannerTranslateDto } from './admin-update-banner-translate.dto';

export class AdminUpdateBannerDto extends IntersectionType(
  AdminUpdateBannerImageDto,
  AdminUpdateBannerTranslateDto,
) {}
