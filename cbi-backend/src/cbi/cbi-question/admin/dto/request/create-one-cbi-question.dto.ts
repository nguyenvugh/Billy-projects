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
import { CreateOneCbiQuestionOptionDto } from '../../../../cbi-question-option/admin/dto/request/create-one-cbi-question-option.dto';

export class CreateOneCbiQuestionDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  order_display: number;

  @IsEmpty()
  total_scores: number;

  @IsEmpty()
  cbi_level_group_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: true,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  status_answer_mandatory: BooleanStatusEnum;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOneCbiQuestionOptionDto)
  @ApiProperty({
    required: true,
    type: [CreateOneCbiQuestionOptionDto],
  })
  options: CreateOneCbiQuestionOptionDto[];
}
