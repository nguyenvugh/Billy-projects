import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DEPARTMENT_NAME } from '../../../common/constants/global.constant';
import { FileRes } from '../../../file/dto/res/file.dto';
import { ResTranslates } from './translate.dto';

class Banner {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  @Type(() => FileRes)
  image: FileRes;

  @ApiProperty()
  @Expose()
  link: string;

  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  translates: ResTranslates[];

  @ApiProperty()
  @Expose()
  field: DEPARTMENT_NAME;
}

export class ResGetListBanner {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Banner)
  data: Banner[];

  @ApiProperty()
  @Expose()
  total: number;
}
