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
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOneCbiDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  total_levels: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  thumbnail_id: string;
}
