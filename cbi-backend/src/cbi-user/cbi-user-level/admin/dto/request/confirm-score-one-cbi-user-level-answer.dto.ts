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
import { ConfirmScoreOneCbiUserQuestionAnswerDto } from '../../../../cbi-user-question-answer/admin/dto/request/confirm-score-one-cbi-user-question-answer.dto';

export class ConfirmScoreOneCbiUserLevelAnswerDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConfirmScoreOneCbiUserQuestionAnswerDto)
  @ApiProperty({
    required: true,
    type: [ConfirmScoreOneCbiUserQuestionAnswerDto],
  })
  answers: ConfirmScoreOneCbiUserQuestionAnswerDto[];
}
