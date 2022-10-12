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
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMultiInventoryInputHistoriesDto {
  @IsNotEmpty()
  @IsArray()
  @IsPositive({ each: true })
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: [Number],
  })
  ids: number[];
}