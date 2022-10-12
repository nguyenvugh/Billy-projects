import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../../common/constants/global.constant';
import {
  IsValidArrayNumber,
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

class ArticleTranslationDto {
  @ApiProperty()
  @IsValidEnum({ enum: LangEnum, required: true })
  lang: LangEnum;

  @ApiProperty()
  @IsValidText({ required: true })
  title: string;

  @ApiProperty()
  @IsValidText({ required: true })
  slug: string;

  @ApiProperty()
  @IsValidText()
  shortDesc: string;

  @ApiProperty()
  // @IsValidText()
  @IsString()
  @IsNotEmpty()
  content: string;
}
export class CreateArticleDto {
  @ApiProperty()
  @IsValidNumber({ required: true })
  categoryId: number;

  @ApiProperty()
  @IsValidNumber({ required: true })
  thumbnailId: number;

  @ApiProperty()
  @IsValidArrayNumber({ required: false })
  images: number[];

  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @IsValidEnum({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @ApiProperty()
  @IsValidText({ required: false })
  author: string;

  @ApiProperty()
  @IsValidArrayObject({}, ArticleTranslationDto)
  translations: ArticleTranslationDto[];
}
