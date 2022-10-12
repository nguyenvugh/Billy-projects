import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class RegisterEventDto {
  @ApiProperty({ required: true })
  @IsValidNumber({ required: true })
  eventId: number;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  phone: string;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  fullName: string;
}
