import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../../common/constants/global.constant';
import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

class EventTranslationDto {
  @ApiProperty({ required: true })
  @IsValidEnum({ enum: LangEnum, required: true })
  lang: LangEnum;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  title: string;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  slug: string;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  shortDesc: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  content: string;
}
export class CreateEventDto {
  @ApiProperty()
  @IsValidNumber({ required: true })
  thumbnailId: number;

  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @IsValidEnum({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @ApiProperty()
  @IsValidText({ required: true })
  location: string;

  @ApiProperty()
  @IsValidText({ required: true })
  timeStart: Date;

  @ApiProperty()
  @IsValidArrayObject({}, EventTranslationDto)
  translations: EventTranslationDto[];
}
