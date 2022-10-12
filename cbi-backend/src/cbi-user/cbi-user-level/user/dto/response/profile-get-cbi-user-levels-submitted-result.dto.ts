import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProfileGetCbiUserLevelSubmittedResultDto } from './profile-get-cbi-user-level-submitted-result.dto';

@Exclude()
export class ProfileGetCbiUserLevelsSubmittedResultDto {
  @ApiProperty({
    type: [ProfileGetCbiUserLevelSubmittedResultDto],
  })
  @Type(() => ProfileGetCbiUserLevelSubmittedResultDto)
  @Expose()
  results: ProfileGetCbiUserLevelSubmittedResultDto[];
}
