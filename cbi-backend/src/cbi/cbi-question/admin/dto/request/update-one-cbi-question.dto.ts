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
import { UpdateOneCbiQuestionOptionDto } from '../../../../cbi-question-option/admin/dto/request/update-one-cbi-question-option.dto';

export class UpdateOneCbiQuestionDto {
  @IsNotEmpty()
  @IsString()
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
  @Type(() => UpdateOneCbiQuestionOptionDto)
  @ApiProperty({
    required: true,
    type: [UpdateOneCbiQuestionOptionDto],
  })
  options: UpdateOneCbiQuestionOptionDto[];
}
