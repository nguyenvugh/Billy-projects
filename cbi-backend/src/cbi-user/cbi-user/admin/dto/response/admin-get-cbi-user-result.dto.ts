import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { GetCbiResultDto } from '../../../../../cbi/cbi/admin/dto/response/get-cbi-result.dto';
import { ClientDTO } from '../../../../../auth/dto/res/client.dto';

@Exclude()
export class AdminGetCbiUserResult {
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
    type: GetCbiResultDto,
  })
  @Type(() => GetCbiResultDto)
  @Expose()
  cbi: GetCbiResultDto;

  @ApiProperty({
    type: ClientDTO,
  })
  @Type(() => ClientDTO)
  @Expose()
  user: ClientDTO;
}
