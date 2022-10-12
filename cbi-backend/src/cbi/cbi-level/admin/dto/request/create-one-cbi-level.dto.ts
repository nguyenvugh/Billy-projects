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
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';

export class CreateOneCbiLevelDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  cbi_id: string;

  @IsEmpty()
  level: number;

  @IsEmpty()
  total_questions: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: true,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  auto_calculate_score: BooleanStatusEnum;

  @IsNotEmpty()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: true,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  status_publish: BooleanStatusEnum;
}
