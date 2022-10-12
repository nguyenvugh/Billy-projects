import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsPhoneNumber,
  MaxLength,
  maxLength,
} from 'class-validator';
import { IsValidText } from 'src/common/decorators/custom-validator.decorator';

export class CreateContactDto {
  @ApiProperty()
  @IsValidText({ maxLength: 100 })
  name: string;

  @ApiProperty()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsValidText({ maxLength: 11 })
  @IsPhoneNumber('VN')
  phone: string;

  @ApiProperty()
  @IsValidText({ maxLength: 250 })
  content: string;
}
