import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserGetCbiLevelResultDto } from '../../../../../cbi/cbi-level/user/dto/response/user-get-cbi-level-result.dto';

@Exclude()
export class ProfileGetCbiUserLevelSubmittedResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  total_scores: number;

  @ApiProperty({
    type: UserGetCbiLevelResultDto,
  })
  @Type(() => UserGetCbiLevelResultDto)
  @Expose()
  cbi_level: UserGetCbiLevelResultDto;
}
