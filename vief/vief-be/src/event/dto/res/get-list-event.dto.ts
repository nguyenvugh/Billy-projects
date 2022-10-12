import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CateThumbnailRes } from '../../../category/dto/res/file.dto';
import { ResTranslates } from '../../../category/dto/res/translate.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
  SECTIONS_NAME,
} from '../../../common/constants/global.constant';

class Event {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  thumbnail: CateThumbnailRes;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  translates: ResTranslates[];

  @ApiProperty()
  @Expose()
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @Expose()
  isFeature: BooleanEnum;

  @ApiProperty()
  @Expose()
  lang: LangEnum;

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

export class ResGetListEvent {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Event)
  @Transform(({ value }) => {
    value = value.map((item) => ({
      ...item,
      title: item.translates[0]?.title,
      lang: item.translates[0]?.lang,
      slug: item.translates[0]?.slug,
      shortDesc: item.translates[0]?.shortDesc,
      content: item.translates[0]?.content,
      translates: undefined,
    }));
    return [...value];
  })
  data: Event[];

  @ApiProperty()
  @Expose()
  total: number;
}
