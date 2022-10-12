import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DEPARTMENT_NAME } from '../../../common/constants/global.constant';
import { FileRes } from '../../../file/dto/res/file.dto';
import { ResTranslates } from './translate.dto';

class Document {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @Type(() => FileRes)
  file: FileRes;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  translates: ResTranslates[];

  @ApiProperty()
  @Expose()
  field: DEPARTMENT_NAME;
}

export class ResGetListDocument {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Document)
  data: Document[];

  @ApiProperty()
  @Expose()
  total: number;
}
