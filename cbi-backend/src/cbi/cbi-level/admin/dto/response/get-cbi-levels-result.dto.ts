import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetCbiLevelResultDto } from './get-cbi-level-result.dto';

export class GetCbiLevelsResultDto {
  @ApiProperty({
    type: [GetCbiLevelResultDto],
  })
  @Type(() => GetCbiLevelResultDto)
  results: GetCbiLevelResultDto[];
}
