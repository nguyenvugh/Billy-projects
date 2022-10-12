import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
