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
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanValue } from '../../../common/constants/global.constant';

export class UpdateOneProductComboStatusDto {
  @IsNotEmpty()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: true,
    enum: [BooleanValue.FALSE, BooleanValue.TRUE],
    default: BooleanValue.FALSE,
  })
  status: BooleanValue;
}
