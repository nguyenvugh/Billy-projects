import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { AdminGetCbiUserResult } from '../../../../cbi-user/admin/dto/response/admin-get-cbi-user-result.dto';
import { GetCbiLevelResultDto } from '../../../../../cbi/cbi-level/admin/dto/response/get-cbi-level-result.dto';

// TODO: check dto not work, still show all attributes of question entity
// TODO: removed extends and still not work
@Exclude()
export class GetCbiUserLevelNeedConfirmScoreResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty({
    type: AdminGetCbiUserResult,
  })
  @Expose()
  @Type(() => AdminGetCbiUserResult)
  cbi_user: AdminGetCbiUserResult;

  @ApiProperty({
    type: GetCbiLevelResultDto,
  })
  @Expose()
  @Type(() => GetCbiLevelResultDto)
  cbi_level: GetCbiLevelResultDto;
}
