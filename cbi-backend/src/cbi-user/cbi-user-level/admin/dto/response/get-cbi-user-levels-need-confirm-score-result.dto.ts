import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetCbiUserLevelNeedConfirmScoreResultDto } from './get-cbi-user-level-need-confirm-score-result.dto';

export class GetCbiLevelGroupsCbiUserLevelSubmittedResultDto {
  @ApiProperty({
    type: [GetCbiUserLevelNeedConfirmScoreResultDto],
  })
  @Type(() => GetCbiUserLevelNeedConfirmScoreResultDto)
  results: GetCbiUserLevelNeedConfirmScoreResultDto[];

  @ApiProperty()
  total: number;
}
