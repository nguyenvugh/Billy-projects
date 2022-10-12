import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

class PaginateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({ example: 1, required: false })
  page: number;

  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ example: 20, required: false })
  limit: number;
}

export default PaginateDto;
