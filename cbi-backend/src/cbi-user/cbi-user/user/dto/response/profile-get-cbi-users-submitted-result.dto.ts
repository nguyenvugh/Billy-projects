import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileGetCbiUserSubmittedResult } from './profile-get-cbi-user-submitted-result.dto';

@Exclude()
export class ProfileGetCbiUsersSubmittedResult {
  @ApiProperty({
    type: [ProfileGetCbiUserSubmittedResult],
  })
  @Type(() => ProfileGetCbiUserSubmittedResult)
  @Expose()
  results: ProfileGetCbiUserSubmittedResult[];

  @ApiProperty()
  @Expose()
  total: number;
}
