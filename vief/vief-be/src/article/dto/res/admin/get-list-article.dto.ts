import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ResGetCategory } from '../../../../category/dto/res/admin/get-category.dto';
import { CateThumbnailRes } from '../../../../category/dto/res/file.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
} from '../../../../common/constants/global.constant';
import { ResTranslateArticle } from '../article-translate.dto';
class Article {
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
  title: string;

  @ApiProperty()
  @Exclude()
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  images: CateThumbnailRes;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  translates: ResTranslateArticle[];

  @ApiProperty()
  @Expose()
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @Expose()
  isFeature: BooleanEnum;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => {
    return {
      id: value.id,
      name: value.translates[0]?.name,
      slug: value.translates[0]?.slug,
      type: value.type,
    };
  })
  category: ResGetCategory;
}

export class ResGetListArticle {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Article)
  @Transform(({ value }) => {
    value = value.map((item) => ({
      id: item.id,
      thumbnail: item.thumbnail,
      title: item.translates[0]?.title,
      field: item.field,
      isFeature: item.isFeature,
      category: item.category,
    }));
    return [...value];
  })
  data: Article[];

  @ApiProperty()
  @Expose()
  total: number;
}
