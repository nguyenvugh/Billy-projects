import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserGetCbiLevelResultDto } from './user-get-cbi-level-result.dto';

@Exclude()
export class UserGetCbiLevelsResultDto {
  @ApiProperty()
  @Expose()
  time_to_test_again: number;

  @ApiProperty({
    type: [UserGetCbiLevelResultDto],
  })
  @Type(() => UserGetCbiLevelResultDto)
  @Expose()
  results: UserGetCbiLevelResultDto[];
}
