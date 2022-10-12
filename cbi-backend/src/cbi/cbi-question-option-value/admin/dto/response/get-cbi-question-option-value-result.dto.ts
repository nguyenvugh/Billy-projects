import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';

@Exclude()
export class GetCbiQuestionOptionValueResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  score: number;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_right_option_value: BooleanStatusEnum;

  @ApiProperty()
  @Expose()
  order_display: number;
}
