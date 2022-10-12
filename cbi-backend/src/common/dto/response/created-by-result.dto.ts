import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../constants/global.constant';

@Exclude()
export class CreatedByResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;
}
