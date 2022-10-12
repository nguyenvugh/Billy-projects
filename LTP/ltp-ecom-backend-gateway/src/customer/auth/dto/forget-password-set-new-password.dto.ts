import { IsNotEmpty, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordSetNewPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    minLength: 1,
  })
  code: string;

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
