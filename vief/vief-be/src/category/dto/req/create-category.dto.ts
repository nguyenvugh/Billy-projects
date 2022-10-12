import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
  SECTIONS_NAME,
} from '../../../common/constants/global.constant';
import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

class CategoryTranslationDto {
  @ApiProperty()
  @IsValidEnum({ enum: LangEnum })
  lang: LangEnum;

  @ApiProperty()
  @IsValidText()
  name: string;

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
export class CreateCategoryDto {
  @ApiProperty({ required: true })
  @IsValidEnum({ enum: SECTIONS_NAME })
  type: SECTIONS_NAME;

  @ApiProperty()
  @IsValidNumber({ required: false })
  thumbnailId: number;

  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @IsValidEnum({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @ApiProperty()
  @IsValidText({ required: false })
  path: string;

  @ApiProperty()
  @IsValidArrayObject({}, CategoryTranslationDto)
  translations: CategoryTranslationDto[];
}
