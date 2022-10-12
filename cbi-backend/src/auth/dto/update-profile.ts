import { PartialType, PickType } from '@nestjs/swagger';
import { ProfileDTO } from './profile.dto';

export class UpdateProfileDTO extends PartialType(
  PickType(ProfileDTO, ['fullName', 'phoneNumber', 'username'] as const),
) {}
