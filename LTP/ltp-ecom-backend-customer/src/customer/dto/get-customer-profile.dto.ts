import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetCustomerProfileDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ required: true })
  customer: number;
}
