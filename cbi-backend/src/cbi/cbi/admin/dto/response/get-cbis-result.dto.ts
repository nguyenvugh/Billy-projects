import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetCbiResultDto } from './get-cbi-result.dto';

export class GetCbisResultDto {
  @ApiProperty({
    type: [GetCbiResultDto],
  })
  @Type(() => GetCbiResultDto)
  results: GetCbiResultDto[];

  @ApiProperty()
  total: number;
}
