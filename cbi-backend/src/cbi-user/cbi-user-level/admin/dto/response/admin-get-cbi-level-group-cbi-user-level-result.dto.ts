import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { GetCbiLevelGroupResultDto } from '../../../../../cbi/cbi-level-group/admin/dto/response/get-cbi-level-group-result.dto';
import { AdminGetCbiQuestionSubmittedResultDto } from '../../../../../cbi/cbi-question/admin/dto/response/admin-get-cbi-question-submitted-result.dto';

// TODO: check dto not work, still show all attributes of question entity
// TODO: removed extends and still not work
@Exclude()
export class AdminGetCbiLevelGroupCbiUserLevelResultDto extends GetCbiLevelGroupResultDto {
  @ApiProperty({
    type: [AdminGetCbiQuestionSubmittedResultDto],
  })
  @Type(() => AdminGetCbiQuestionSubmittedResultDto)
  @Expose()
  questions: AdminGetCbiQuestionSubmittedResultDto[];
}
