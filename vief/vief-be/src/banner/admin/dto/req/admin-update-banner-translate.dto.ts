import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminFieldValidateMessages } from '../../../../common/constants/validate.constant';
import { LangRequiredDto } from '../../../../common/dto/req/field/lang-required.dto';
import { BannerUrlRequiredDto } from './field/banner-url-required.dto';
import { BannerDescriptionRequiredDto } from './field/banner-description-required.dto';
import { BannerHeadTitleRequiredDto } from './field/banner-head-title-required.dto';
import { BannerSubTitleRequiredDto } from './field/banner-sub-title-required.dto';

export class AdminUpdateBannerTranslateFieldsDto extends IntersectionType(
  LangRequiredDto,
  IntersectionType(
    BannerUrlRequiredDto,
    IntersectionType(
      BannerHeadTitleRequiredDto,
      IntersectionType(BannerSubTitleRequiredDto, BannerDescriptionRequiredDto),
    ),
  ),
) {}

export class AdminUpdateBannerTranslateDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.translate.not_empty,
  })
  @ValidateNested({ each: true })
  @Type(() => AdminUpdateBannerTranslateFieldsDto)
  @ApiProperty({
    required: true,
    type: [AdminUpdateBannerTranslateFieldsDto],
  })
  translates: AdminUpdateBannerTranslateFieldsDto[];
}
