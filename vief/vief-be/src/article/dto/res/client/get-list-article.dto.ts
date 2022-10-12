import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ResGetCategory } from '../../../../category/dto/res/admin/get-category.dto';
import { CateThumbnailRes } from '../../../../category/dto/res/file.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
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
  @Expose()
  author: string;

  @ApiProperty()
  @Expose()
  lang: LangEnum;

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

export class ResGetListArticleByClient {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Article)
  @Transform(({ value }) => {
    value = value.map((item) => ({
      id: item.id,
      thumbnail: item.thumbnail,
      title: item.translates[0]?.title,
      slug: item.translates[0]?.slug,
      shortDesc: item.translates[0]?.shortDesc,
      content: item.translates[0]?.content,
      lang: item.translates[0]?.lang,
      author: item.author,
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
