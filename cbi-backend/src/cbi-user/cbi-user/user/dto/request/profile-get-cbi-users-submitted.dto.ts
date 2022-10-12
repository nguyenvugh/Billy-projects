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
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateDto } from '../../../../../common/dto/request/paginate.dto';

export class ProfileGetCbiUsersSubmitted extends PaginateDto {}
