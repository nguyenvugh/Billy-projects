import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class BannerHeadTitleRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.headTitle.not_empty,
  })
  @MinLength(2, {
    message: AdminFieldValidateMessages.headTitle.min_length,
  })
  @MaxLength(100, {
    message: AdminFieldValidateMessages.headTitle.max_length,
  })
  // TODO: apply regex to only allow raw unicode text (multi lang)
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  headTitle: string;
}
