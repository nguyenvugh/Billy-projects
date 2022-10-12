import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length, MinLength } from 'class-validator';
import {
  EUserStatus,
  REGEX_PASSWORD,
} from 'src/common/constants/global.constant';
import { IsValidText } from 'src/common/decorators/custom-validator.decorator';
import { Action } from 'src/common/enums/action.enum';
import { Resource } from 'src/common/enums/resource.enum';

export class CreateAdminUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  groupPoliciesKey: string;

  @ApiProperty()
  @IsEnum(EUserStatus)
  status: EUserStatus;

  @MinLength(5)
  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  @IsValidText({ minLength: 8, matches: REGEX_PASSWORD })
  readonly password: string;

  @ApiProperty()
  @IsString()
  @Length(10)
  readonly phoneNumber: string;
}
