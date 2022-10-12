import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../constants/global.constant';
import { AdminFieldValidateMessages } from '../../constants/validate.constant';

export class PaginateDto {
  @IsOptional()
  @IsNumber(
    {},
    {
      message: AdminFieldValidateMessages.page.invalid,
    },
  )
  @Min(1, {
    message: AdminFieldValidateMessages.page.min,
  })
  @Type(() => Number)
  @ApiProperty({ example: 1, required: false })
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: AdminFieldValidateMessages.limit.invalid,
    },
  )
  @Min(1, {
    message: AdminFieldValidateMessages.limit.min,
  })
  @Type(() => Number)
  @ApiProperty({ example: 20, required: false })
  limit: number = DEFAULT_LIMIT;
}
