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
import { BooleanValue } from '../../common/constants';

export class UpdateOneProductComboStatusDto {
  @IsNotEmpty()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  @ApiProperty({
    required: true,
  })
  status: BooleanValue;
}
