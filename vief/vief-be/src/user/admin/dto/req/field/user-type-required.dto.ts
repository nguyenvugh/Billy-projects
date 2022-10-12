import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class UserTypeRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.user_type.not_empty,
  })
  @ApiProperty({
    required: true,
  })
  userType: string;
}
