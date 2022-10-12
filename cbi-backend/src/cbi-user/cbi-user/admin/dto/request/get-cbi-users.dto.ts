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
import { ApiProperty } from '@nestjs/swagger';

export class GetCbiUsersDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  user_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  cbi_id: string;
}
