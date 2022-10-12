import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { GetCbiLevelGroupResultDto } from '../../../admin/dto/response/get-cbi-level-group-result.dto';
import { UserGetCbiQuestionResultDto } from '../../../../cbi-question/user/dto/response/user-get-cbi-question-result.dto';

// TODO: check dto not work, still show all attributes of question entity
// TODO: removed extends and still not work
@Exclude()
export class UserGetCbiLevelGroupFullQuestionsResultDto extends GetCbiLevelGroupResultDto {
  @ApiProperty({
    type: [UserGetCbiQuestionResultDto],
  })
  @Type(() => UserGetCbiQuestionResultDto)
  @Expose()
  questions: UserGetCbiQuestionResultDto[];
}
