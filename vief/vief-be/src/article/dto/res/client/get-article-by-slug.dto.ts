import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ResGetCategory } from '../../../../category/dto/res/admin/get-category.dto';
import { CateThumbnailRes } from '../../../../category/dto/res/file.dto';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../../common/constants/global.constant';

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
  shortDesc: string;
}

class Article {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  author: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  shortDesc: string;

  @ApiProperty()
  @Expose()
  content: string;

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
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  thumbnail: CateThumbnailRes;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CateThumbnailRes)
  images: CateThumbnailRes[];
}

export class ResGetArticleBySlug {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ResGetCategory)
  @Expose()
  @Transform(({ value }) => {
    return {
      id: value.id,
      name: value.translates[0]?.name,
      slug: value.translates[0]?.slug,
      shortDesc: value.translates[0]?.shortDesc,
      type: value.type,
    };
  })
  category: ResGetCategory;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Article)
  @Transform(({ value }) => {
    return {
      id: value.id,
      thumbnail: value.thumbnail,
      images: value.images,
      title: value.translates[0]?.title,
      field: value.field,
      isFeature: value.isFeature,
      author: value.author,
      lang: value.translates[0]?.lang,
      slug: value.translates[0]?.slug,
      shortDesc: value.translates[0]?.shortDesc,
      content: value.translates[0]?.content,
    };
  })
  article: Article;
}
