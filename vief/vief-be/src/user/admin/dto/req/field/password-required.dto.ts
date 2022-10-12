import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import {
  AdminFieldValidateMessages,
  ValidateRegex,
} from '../../../../../common/constants/validate.constant';

export class PasswordRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.password.not_empty,
  })
  @MinLength(8, {
    message: AdminFieldValidateMessages.password.min_length,
  })
  @MaxLength(15, {
    message: AdminFieldValidateMessages.password.max_length,
  })
  @Matches(ValidateRegex.password, '', {
    message: AdminFieldValidateMessages.password.invalid,
  })
  @ApiProperty({
    required: true,
    minLength: 8,
    maxLength: 15,
  })
  password: string;
}
