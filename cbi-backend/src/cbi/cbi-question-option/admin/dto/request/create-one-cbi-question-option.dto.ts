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
  Min,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CbiQuestionOptionTypeEnum } from '../../../constant';
import { CreateOneCbiQuestionOptionValueDto } from '../../../../cbi-question-option-value/admin/dto/request/create-one-cbi-question-option-value.dto';

export class CreateOneCbiQuestionOptionDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  cbi_question_id: string;

  @IsEmpty()
  order_display: number;

  @IsNotEmpty()
  @IsEnum(CbiQuestionOptionTypeEnum)
  @ApiProperty({
    required: true,
    enum: [
      CbiQuestionOptionTypeEnum.SINGLE_CHOICE,
      CbiQuestionOptionTypeEnum.MULTI_CHOICE,
      CbiQuestionOptionTypeEnum.ENTER_ANSWER,
      CbiQuestionOptionTypeEnum.UPLOAD_FILE,
    ],
  })
  type: CbiQuestionOptionTypeEnum;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOneCbiQuestionOptionValueDto)
  @ApiProperty({
    required: true,
    type: [CreateOneCbiQuestionOptionValueDto],
  })
  values: CreateOneCbiQuestionOptionValueDto[];
}
