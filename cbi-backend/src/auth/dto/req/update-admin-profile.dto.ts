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

export class UpdateAdminDTO extends PartialType(
  PickType(CreateAdminDTO, ['fullName', 'phoneNumber']),
) {
  @IsOptional()
  @IsValidText({ minLength: 8, matches: REGEX_PASSWORD })
  password: string;

  @IsOptional()
  @MatchField('password')
  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  @IsOptional()
  @IsValidText({ minLength: 8 })
  oldPassword: string;

  @ApiProperty()
  @IsOptional()
  avatarId: string;
}
