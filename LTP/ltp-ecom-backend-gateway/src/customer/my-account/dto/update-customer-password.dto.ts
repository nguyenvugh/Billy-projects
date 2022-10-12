import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  old_password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  new_password: string;
}
