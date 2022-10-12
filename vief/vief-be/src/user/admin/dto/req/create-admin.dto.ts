import { IntersectionType } from '@nestjs/swagger';
import { EmailRequiredDto } from './field/email-required.dto';
import { PasswordRequiredDto } from './field/password-required.dto';
import { UserTypeRequiredDto } from './field/user-type-required.dto';

export class CreateAdminDto extends IntersectionType(
  EmailRequiredDto,
  IntersectionType(PasswordRequiredDto, UserTypeRequiredDto),
) {}
