import {
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  password: string;
}
