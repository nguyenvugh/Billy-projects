import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Default } from '../decorator/default.decorator';

class PaginateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({ example: 1, required: false })
  page: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @ApiProperty({ example: 20, required: false })
  limit: number;
}

export default PaginateDto;
