import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';

@Exclude()
export class ResultScoreCbiUserLevelAnswerResultDto {
  @ApiProperty()
  @Expose()
  total_scores: number;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_pass?: BooleanStatusEnum;

  @ApiProperty()
  @Expose()
  title_earned?: string;
}
