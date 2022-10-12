import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SocialLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  social_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  social_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    maxLength: 255,
  })
  name: string;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({
    required: false,
    maxLength: 255,
  })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    maxLength: 255,
  })
  email: string;
}
