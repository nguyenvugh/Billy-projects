import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AdminGetCbiLevelGroupCbiUserLevelResultDto } from './admin-get-cbi-level-group-cbi-user-level-result.dto';

export class AdminGetCbiLevelGroupsCbiUserLevelResultDto {
  @ApiProperty({
    type: [AdminGetCbiLevelGroupCbiUserLevelResultDto],
  })
  @Type(() => AdminGetCbiLevelGroupCbiUserLevelResultDto)
  results: AdminGetCbiLevelGroupCbiUserLevelResultDto[];
}
