import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  DEPARTMENT_NAME,
  LangEnum,
} from '../../../../common/constants/global.constant';
import { FileRes } from '../../../../file/dto/res/file.dto';

class ResTranslatesDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  lang: LangEnum;

  @ApiProperty()
  @Expose()
  shortDesc: string;

  @ApiProperty()
  @Exclude()
  createdAt: string;

  @ApiProperty()
  @Exclude()
  updatedAt: string;

  @ApiProperty()
  @Exclude()
  deletedAt: string;

  @ApiProperty()
  @Exclude()
  version: number;
}

export class ResGetDocument {
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
  @Type(() => ResTranslatesDto)
  translates: ResTranslatesDto[];

  @ApiProperty()
  @Expose()
  field: DEPARTMENT_NAME;
}
