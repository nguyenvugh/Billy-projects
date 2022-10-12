import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import {
  AdminFieldValidateMessages,
  ValidateRegex,
} from '../../../../../common/constants/validate.constant';

export class ImageIdRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.id.image.not_empty,
  })
  @ApiProperty({
    required: true,
  })
  id: number;
}
