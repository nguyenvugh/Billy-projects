import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';

@Exclude()
export class CheckUserCanOpenSpecialCbiResult {
  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  result: BooleanStatusEnum;
}
