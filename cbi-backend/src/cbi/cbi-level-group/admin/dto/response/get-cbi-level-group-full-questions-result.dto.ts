import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { GetCbiLevelGroupResultDto } from './get-cbi-level-group-result.dto';
import { GetCbiQuestionResultDto } from '../../../../cbi-question/admin/dto/response/get-cbi-question-result.dto';

// TODO: check dto not work, still show all attributes of question entity
// TODO: removed extends and still not work
@Exclude()
export class GetCbiLevelGroupFullQuestionsResultDto extends GetCbiLevelGroupResultDto {
  @ApiProperty({
    type: [GetCbiQuestionResultDto],
  })
  @Type(() => GetCbiQuestionResultDto)
  @Expose()
  questions: GetCbiQuestionResultDto[];
}
