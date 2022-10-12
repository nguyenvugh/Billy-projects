import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import {
  AdminFieldValidateMessages,
  ValidateRegex,
} from '../../../../../common/constants/validate.constant';

export class ImageTitleRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.title.image.not_empty,
  })
  @MinLength(2, {
    message: AdminFieldValidateMessages.title.image.min_length,
  })
  @MaxLength(255, {
    message: AdminFieldValidateMessages.title.image.max_length,
  })
  // TODO: apply regex to only allow raw unicode text (multi lang)
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 255,
  })
  title: string;
}
