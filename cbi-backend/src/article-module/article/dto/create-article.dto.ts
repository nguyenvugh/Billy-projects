import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  ArticleStatus,
  BooleanEnum,
  LangEnum,
} from 'src/common/constants/global.constant';
import {
  IsValidArrayString,
  IsValidDate,
  IsValidEnum,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { Default } from '../../../common/decorators/default-value.decorator';
import { getValEnumNumber, getValEnumStr } from '../../../common/utils';

export class CreateArticleDto {
  @ApiHideProperty()
  @Default(LangEnum.En)
  lang: LangEnum;

  @ApiProperty()
  @IsValidText({ minLength: 3 })
  title: string;

  @ApiProperty()
  @IsValidText({ maxLength: 15000 })
  content: string;

  @ApiProperty()
  @IsValidText()
  authorName: string;

  @ApiProperty()
  @IsValidText({ maxLength: 250 })
  description: string;

  @ApiProperty()
  @IsString()
  idCategory: string;

  @ApiProperty()
  @IsValidText()
  thumbnailId: string;

  @ApiProperty({ enum: getValEnumStr(ArticleStatus), required: false })
  @IsValidEnum({ enum: ArticleStatus, required: false })
  status?: ArticleStatus;

  @ApiProperty({
    enum: getValEnumNumber(BooleanEnum),
    default: BooleanEnum.FALSE,
    required: false,
  })
  @IsValidEnum({ enum: BooleanEnum, required: false })
  isFeature?: BooleanEnum;

  @ApiProperty()
  @IsValidDate({ required: false })
  publishAt: Date;
}
