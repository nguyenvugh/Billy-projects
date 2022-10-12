import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import {
  AdminFieldValidateMessages,
  ValidateRegex,
} from '../../../../../common/constants/validate.constant';

export class PasswordOptionalDto {
  @IsOptional()
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
    required: false,
    minLength: 8,
    maxLength: 15,
  })
  password: string;
}
