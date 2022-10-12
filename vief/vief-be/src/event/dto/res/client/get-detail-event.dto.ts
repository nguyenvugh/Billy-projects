import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CateThumbnailRes } from '../../../../category/dto/res/file.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
  SECTIONS_NAME,
} from '../../../../common/constants/global.constant';
import { ResTranslatesDto } from '../admin/get-detail-event.dto';

class DetailEvent {
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

export class ResGetDetailEventByClient {
  @ApiProperty()
  @Expose()
  @Type(() => DetailEvent)
  @Transform(({ value }) => {
    return {
      ...value,
      title: value.translates[0]?.title,
      slug: value.translates[0]?.slug,
      shortDesc: value.translates[0]?.shortDesc,
      content: value.translates[0]?.content,
      translates: undefined,
      lang: value.translates[0]?.lang,
    };
  })
  data: DetailEvent;
}
