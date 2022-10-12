import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumberString,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IpnUpdateShippingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  jwt: string;
}
