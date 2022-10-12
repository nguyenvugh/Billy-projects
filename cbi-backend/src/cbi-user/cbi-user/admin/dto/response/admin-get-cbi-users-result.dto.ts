import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AdminGetCbiUserResult } from './admin-get-cbi-user-result.dto';

@Exclude()
export class AdminGetCbiUsersResult {
  @ApiProperty({
    type: [AdminGetCbiUserResult],
  })
  @Type(() => AdminGetCbiUserResult)
  results: AdminGetCbiUserResult[];
}
