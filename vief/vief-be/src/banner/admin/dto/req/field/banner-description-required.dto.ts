import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class BannerDescriptionRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.description.not_empty,
  })
  @MinLength(2, {
    message: AdminFieldValidateMessages.description.banner.min_length,
  })
  @MaxLength(300, {
    message: AdminFieldValidateMessages.description.banner.max_length,
  })
  // TODO: apply regex to only allow raw unicode text (multi lang)
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 300,
  })
  description: string;
}
