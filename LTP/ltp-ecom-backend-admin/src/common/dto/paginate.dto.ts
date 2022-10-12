import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

class PaginateDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({ example: 1 })
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ example: 20 })
  limit?: number;
}

export default PaginateDto;
