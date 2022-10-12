import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordGenCodeDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  email: string;
}
