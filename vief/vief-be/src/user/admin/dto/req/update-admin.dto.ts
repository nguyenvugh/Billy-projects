import { IntersectionType } from '@nestjs/swagger';
import { EmailRequiredDto } from './field/email-required.dto';
import { PasswordOptionalDto } from './field/password-optional.dto';
import { UserTypeRequiredDto } from './field/user-type-required.dto';

export class UpdateAdminDto extends IntersectionType(
  EmailRequiredDto,
  IntersectionType(PasswordOptionalDto, UserTypeRequiredDto),
) {}
