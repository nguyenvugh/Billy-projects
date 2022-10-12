import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { DEPARTMENT_NAME } from '../../../constants/global.constant';
import { AdminFieldValidateMessages } from '../../../constants/validate.constant';

export class GroupRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.group.not_empty,
  })
  @IsEnum(DEPARTMENT_NAME, {
    message: AdminFieldValidateMessages.group.invalid,
  })
  @ApiProperty({
    required: true,
  })
  group: DEPARTMENT_NAME;
}
