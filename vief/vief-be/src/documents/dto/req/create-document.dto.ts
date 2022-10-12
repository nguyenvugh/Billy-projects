import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  DEPARTMENT_NAME,
  LangEnum,
  SupportFileType,
} from '../../../common/constants/global.constant';
import {
  IsValidArrayObject,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class DocumentTranslation {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  shortDesc: string;

  @ApiProperty()
  @IsValidEnum({ enum: LangEnum })
  lang: LangEnum;
}

export class CreateDocumentDto {
  @ApiProperty()
  @IsValidNumber({ required: false })
  fileId: number;

  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @IsValidArrayObject({}, DocumentTranslation)
  translations: DocumentTranslation[];
}
