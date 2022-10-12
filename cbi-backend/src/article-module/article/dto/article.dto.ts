import {
  Exclude,
  Expose,
  plainToClass,
  Transform,
  Type,
} from 'class-transformer';
import {
  ArticleStatus,
  BooleanEnum,
  LangEnum,
} from '../../../common/constants/global.constant';
import { FileAdminDto } from '../../../file/dto/file-admin.dto';
import { ArticleToCategory } from '../entity/articleToCategory.entity';

@Exclude()
class ArticleTranslateDto {
  @Expose()
  lang: LangEnum;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  slug: string;
}

@Exclude()
class ArticleCategoryTranslateDto {
  @Expose()
  lang: LangEnum;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;
}

@Exclude()
class ArticleCategoryDto {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  @Type(() => ArticleCategoryTranslateDto)
  translates: ArticleCategoryTranslateDto;

  constructor(partial: Partial<ArticleCategoryDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
class ThumbnailDto {
  @Expose()
  id: number;

  @Expose()
  originPath: string;

  @Expose()
  type: string;
}

@Exclude()
export class ArticleDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => FileAdminDto)
  thumbnail: FileAdminDto;

  @Expose()
  @Type(() => ArticleTranslateDto)
  translates: ArticleTranslateDto;

  @Expose()
  status: ArticleStatus;

  @Expose()
  description: string;

  @Expose()
  isFeature: BooleanEnum;

  @Expose()
  authorName: string;

  @Expose()
  publishAt: Date;

  @Expose()
  updatedAt: Date;

  // @Expose({ name: 'articleToCategories' })
  // @Transform(({ value }: { value: ArticleToCategory[] }) =>
  //   value.map((val) => plainToClass(ArticleCategoryDto, val.category)),
  // )
  // categories: ArticleCategoryDto;
  @Expose()
  @Type(() => ArticleCategoryDto)
  articleCategory: ArticleCategoryDto;
  constructor(partial: Partial<ArticleDto>) {
    Object.assign(this, partial);
  }
}
