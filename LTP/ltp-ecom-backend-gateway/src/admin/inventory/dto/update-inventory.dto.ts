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
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends OmitType(CreateInventoryDto, []) {}
