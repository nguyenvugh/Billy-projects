import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CateThumbnailRes } from '../../../../category/dto/res/file.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../../common/constants/global.constant';

@Exclude()
class ResTranslatesDto {
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

export class ResGetArticle {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  thumbnail: CateThumbnailRes;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  images: CateThumbnailRes[];

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

  @ApiProperty()
  @Expose()
  author: string;
}
