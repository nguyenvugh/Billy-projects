import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { REGEX_PASSWORD } from 'src/common/constants/global.constant';
import { IsValidText } from 'src/common/decorators/custom-validator.decorator';

export class RegisterDTO {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsValidText({ minLength: 8, matches: REGEX_PASSWORD })
  readonly password: string;

  @Expose()
  @MinLength(5)
  @ApiProperty()
  readonly fullName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @Length(10)
  readonly phoneNumber: string;

  @IsValidText({ minLength: 10, maxLength: 13 })
  companyCode: string;

  constructor(partial: Partial<RegisterDTO>) {
    Object.assign(this, partial);
  }
}
