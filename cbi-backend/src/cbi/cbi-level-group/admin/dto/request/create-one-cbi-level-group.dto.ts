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
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOneCbiLevelGroupDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  order_display: number;

  @IsEmpty()
  cbi_level_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    required: true,
  })
  name: string;
}
