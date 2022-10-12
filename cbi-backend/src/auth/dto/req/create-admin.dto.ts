import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  EUserStatus,
  REGEX_PASSWORD,
} from 'src/common/constants/global.constant';
import {
  IsValidText,
  MatchField,
} from 'src/common/decorators/custom-validator.decorator';

export class CreateAdminDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  group_permission_id: string;

  @ApiProperty()
  status: EUserStatus;

  @ApiProperty()
  @IsValidText()
  groupPolicyKey: string;

  @IsValidText({ minLength: 8, matches: REGEX_PASSWORD })
  password: string;

  @MatchField('password')
  @ApiProperty()
  confirmPassword: string;

  @IsValidText()
  @IsOptional()
  @ApiProperty()
  fullName: string;

  @IsOptional()
  @IsValidText({ maxLength: 11 })
  phoneNumber: string;

  constructor(partial: Partial<CreateAdminDTO>) {
    Object.assign(this, partial);
  }
}
