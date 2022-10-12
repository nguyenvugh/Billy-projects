import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
  SECTIONS_NAME,
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
  @IsValidNumber({ required: false })
  id: number;

  @ApiProperty()
  @IsValidEnum({ enum: LangEnum })
  lang: LangEnum;

  @ApiProperty()
  @IsValidText()
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
export class EditArticleDto {
  @ApiProperty()
  @IsValidNumber({ required: true })
  categoryId: number;

  @ApiProperty()
  @IsValidNumber({ required: false })
  thumbnailId: number;

  @ApiProperty()
  @IsValidArrayNumber({ required: false })
  images: number[];

  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty({ required: true })
  @IsValidText()
  author: string;

  @ApiProperty()
  @IsValidEnum({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @ApiProperty()
  @IsValidArrayObject({}, ArticleTranslationDto)
  translations: ArticleTranslationDto[];
}
