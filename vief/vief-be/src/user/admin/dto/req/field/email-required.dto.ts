import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class EmailRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.email.not_empty,
  })
  @MinLength(8, {
    message: AdminFieldValidateMessages.email.min_length,
  })
  @IsEmail(
    {},
    {
      message: AdminFieldValidateMessages.email.invalid,
    },
  )
  @ApiProperty({
    required: true,
    minLength: 8,
  })
  email: string;
}
