import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { LangEnum } from '../../../common/constants/global.constant';

export class ResTranslates {
  @ApiProperty()
  @Expose()
  title: string;

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

  @ApiProperty()
  @Exclude()
  id: number;

  @ApiProperty()
  @Exclude()
  lang: LangEnum;

  @ApiProperty()
  @Exclude()
  shortDesc: string;

  @ApiProperty()
  @Exclude()
  subTitle: string;
}
