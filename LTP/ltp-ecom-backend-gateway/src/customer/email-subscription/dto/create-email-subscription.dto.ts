import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateEmailSubscriptionDto {
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;
}
