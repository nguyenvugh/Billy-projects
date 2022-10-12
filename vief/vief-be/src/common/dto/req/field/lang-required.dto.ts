import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { LangEnum } from '../../../constants/global.constant';
import { AdminFieldValidateMessages } from '../../../constants/validate.constant';

export class LangRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.lang.not_empty,
  })
  @IsEnum(LangEnum, {
    message: AdminFieldValidateMessages.lang.invalid,
  })
  @ApiProperty({
    required: true,
    default: LangEnum.Vi,
  })
  lang: LangEnum;
}
