import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { GetCbiUserLevelNeedConfirmScoreResultDto } from './get-cbi-user-level-need-confirm-score-result.dto';

// TODO: check dto not work, still show all attributes of question entity
// TODO: removed extends and still not work
@Exclude()
export class GetCbiUserLevelResultDto extends GetCbiUserLevelNeedConfirmScoreResultDto {
  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_finish: BooleanStatusEnum;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_admin_calculate_score: BooleanStatusEnum;
}
