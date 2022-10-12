import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerSocialAccountActionConst } from '../../common/constants/customer-social-account.constant';

export class IntergrateSocialAccountDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ required: true })
  customer: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  social_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  social_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    enum: [
      CustomerSocialAccountActionConst.CONNECT,
      CustomerSocialAccountActionConst.DISCONNECT,
    ],
  })
  action: CustomerSocialAccountActionConst;
}
