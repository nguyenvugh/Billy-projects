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
import { SubmitOneCbiUserQuestionAnswerDto } from '../../../../cbi-user-question-answer/user/dto/request/submit-one-cbi-user-question-answer.dto';

export class SubmitOneCbiUserLevelAnswerDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  cbi_user_id: string;

  @IsEmpty()
  cbi_level_id: string;

  @IsEmpty()
  updated_by_id: number;

  @IsNotEmpty()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: true,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  status_finish: BooleanStatusEnum;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SubmitOneCbiUserQuestionAnswerDto)
  @ApiProperty({
    required: true,
    type: [SubmitOneCbiUserQuestionAnswerDto],
  })
  questions: SubmitOneCbiUserQuestionAnswerDto[];
}
