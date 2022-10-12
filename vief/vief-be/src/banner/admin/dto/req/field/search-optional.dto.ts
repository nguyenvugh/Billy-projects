import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchOptionalDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  search: string;
}
