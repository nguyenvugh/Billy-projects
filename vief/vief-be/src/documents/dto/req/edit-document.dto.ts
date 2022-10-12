import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../common/constants/global.constant';
import {
  IsValidArrayObject,
  IsValidEnum,
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

export class EditDocumentDto {
  @ApiProperty({ required: true })
  @IsValidEnum({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @ApiProperty()
  @IsValidArrayObject({}, DocumentTranslation)
  translations: DocumentTranslation[];
}
