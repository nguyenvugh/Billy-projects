import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CateThumbnailRes } from '../../../../category/dto/res/file.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
  SECTIONS_NAME,
} from '../../../../common/constants/global.constant';

@Exclude()
export class ResTranslatesDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  lang: LangEnum;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  shortDesc: string;

  @ApiProperty()
  @Expose()
  content: string;
}

export class ResGetDetailEventByAdmin {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  location: string;

  @ApiProperty()
  @Expose()
  timeStart: string;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  thumbnail: CateThumbnailRes;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ResTranslatesDto)
  translates: ResTranslatesDto[];

  @ApiProperty()
  @Expose()
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @Expose()
  isFeature: BooleanEnum;
}
