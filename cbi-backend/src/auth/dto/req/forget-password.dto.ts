import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { REGEX_PASSWORD } from 'src/common/constants/global.constant';
import { IsValidText } from 'src/common/decorators/custom-validator.decorator';

export class ForgetPassDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ChangeForgetPassDto {
  @ApiProperty()
  token: string;

  @IsValidText({ minLength: 8, matches: REGEX_PASSWORD })
  password: string;
}
