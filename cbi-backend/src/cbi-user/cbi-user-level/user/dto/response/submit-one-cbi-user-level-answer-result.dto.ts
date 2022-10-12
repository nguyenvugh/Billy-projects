import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { ResultScoreCbiUserLevelAnswerResultDto } from './result-score-cbi-user-level-answer-result.dto';

@Exclude()
export class SubmitOneCbiUserLevelAnswerResultDto {
  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status: BooleanStatusEnum;

  @ApiProperty({
    type: ResultScoreCbiUserLevelAnswerResultDto,
  })
  @Type(() => ResultScoreCbiUserLevelAnswerResultDto)
  @Expose()
  result: ResultScoreCbiUserLevelAnswerResultDto;
}
