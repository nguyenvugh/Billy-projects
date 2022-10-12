import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetCbiLevelGroupFullQuestionsResultDto } from './get-cbi-level-group-full-questions-result.dto';

export class GetCbiLevelGroupsFullQuestionsResultDto {
  @ApiProperty({
    type: [GetCbiLevelGroupFullQuestionsResultDto],
  })
  @Type(() => GetCbiLevelGroupFullQuestionsResultDto)
  results: GetCbiLevelGroupFullQuestionsResultDto[];
}
