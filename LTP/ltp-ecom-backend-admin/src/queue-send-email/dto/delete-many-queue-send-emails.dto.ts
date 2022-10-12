import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumberString,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteManyQueueSendEmailsDto {
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: [Number],
  })
  ids: number[];
}
