import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetCbiUserLevelResultDto } from './get-cbi-user-level-result.dto';

export class GetCbiUserLevelsResultDto {
  @ApiProperty({
    type: [GetCbiUserLevelResultDto],
  })
  @Type(() => GetCbiUserLevelResultDto)
  results: GetCbiUserLevelResultDto[];

  @ApiProperty()
  total: number;
}
