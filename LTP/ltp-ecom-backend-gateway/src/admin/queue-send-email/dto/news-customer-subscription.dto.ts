import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class NewsCustomerSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  news_id: number;
}
