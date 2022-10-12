import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserGetCbiResultDto } from './user-get-cbi-result.dto';

export class UserGetCbisResultDto {
  @ApiProperty({
    type: [UserGetCbiResultDto],
  })
  @Type(() => UserGetCbiResultDto)
  results: UserGetCbiResultDto[];

  @ApiProperty()
  total: number;
}
