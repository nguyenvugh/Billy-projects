import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserGetCbiLevelGroupFullQuestionsResultDto } from './user-get-cbi-level-group-full-questions-result.dto';

export class GetCbiLevelGroupsFullQuestionsResultDto {
  @ApiProperty({
    type: [UserGetCbiLevelGroupFullQuestionsResultDto],
  })
  @Type(() => UserGetCbiLevelGroupFullQuestionsResultDto)
  results: UserGetCbiLevelGroupFullQuestionsResultDto[];
}
