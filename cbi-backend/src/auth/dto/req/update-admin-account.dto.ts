import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  EUserStatus,
  REGEX_PASSWORD,
} from 'src/common/constants/global.constant';
import {
  IsValidText,
  MatchField,
} from 'src/common/decorators/custom-validator.decorator';
import { CreateAdminDTO } from './create-admin.dto';

export class UpdateAdminAccountDTO extends PartialType(
  PickType(CreateAdminDTO, [
    'fullName',
    'phoneNumber',
    'status',
    'username',
    'groupPolicyKey',
  ]),
) {
  @IsOptional()
  @IsValidText({ minLength: 8, matches: REGEX_PASSWORD })
  password: string;

  @IsOptional()
  @MatchField('password')
  @ApiProperty()
  confirmPassword: string;
}
