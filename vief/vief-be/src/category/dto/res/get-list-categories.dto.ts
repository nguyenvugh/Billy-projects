import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  SECTIONS_NAME,
} from '../../../common/constants/global.constant';
import { CateThumbnailRes } from './file.dto';
import { ResTranslates } from './translate.dto';

class Category {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  type: SECTIONS_NAME;

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
}

export class ResGetListCategories {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Category)
  @Transform(({ value }) => {
    value = value.map((item) => ({
      ...item,
      name: item.translates[0]?.name,
      slug: item.translates[0]?.slug,
      translates: undefined,
    }));
    return [...value];
  })
  data: Category[];

  @ApiProperty()
  @Expose()
  total: number;
}
