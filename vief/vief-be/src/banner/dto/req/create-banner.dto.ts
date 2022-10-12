import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../common/constants/global.constant';
import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class BannerTranslation {
  @ApiProperty()
  @IsValidText({ required: true })
  title: string;

  @ApiProperty()
  @IsValidText({ required: true })
  subTitle: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  shortDesc: string;

  @ApiProperty()
  @IsValidEnum({ enum: LangEnum })
  lang: LangEnum;
}

export class CreateBannerDto {
  @ApiProperty()
  @IsValidText({ required: true })
  link: string;

  @ApiProperty()
  @IsValidNumber({ required: false })
  imageId: number;

  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @IsValidArrayObject({}, BannerTranslation)
  translations: BannerTranslation[];
}
