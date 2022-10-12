import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { UserGetCbiResultDto } from '../../../../../cbi/cbi/user/dto/response/user-get-cbi-result.dto';

@Exclude()
export class ProfileGetCbiUserSubmittedResult {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Expose()
  total_scores: number;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_pass: BooleanStatusEnum;

  @ApiProperty()
  @Expose()
  title_earned: string;

  @ApiProperty()
  @Expose()
  time_to_test_again: Date;

  @ApiProperty({
    type: UserGetCbiResultDto,
  })
  @Type(() => UserGetCbiResultDto)
  @Expose()
  cbi: UserGetCbiResultDto;
}
