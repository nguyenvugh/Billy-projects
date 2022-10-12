import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class BannerUrlRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.url.banner.not_empty,
  })
  @MinLength(2, {
    message: AdminFieldValidateMessages.url.banner.min_length,
  })
  @MaxLength(100, {
    message: AdminFieldValidateMessages.url.banner.max_length,
  })
  // TODO: apply regex to only allow valid url
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  url: string;
}
