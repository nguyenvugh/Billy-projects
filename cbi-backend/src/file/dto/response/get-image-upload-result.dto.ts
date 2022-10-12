import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { BooleanEnum } from 'src/common/constants/global.constant';

@Exclude()
export class GetImageUploadResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  url: string;
}
