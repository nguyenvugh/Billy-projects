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

export class ConfirmScoreOneCbiUserQuestionAnswerDto {
  @IsEmpty()
  cbi_user_level_id: string;

  @IsEmpty()
  cbi_question_id: string;

  @IsEmpty()
  cbi_question_option_id: string;

  @IsEmpty()
  cbi_question_option_value_id: string;

  @IsEmpty()
  content_answer: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  id: string;

  @IsNotEmpty()
  // TODO: validate decimal number with two decimal places
  @IsNumber()
  @Min(0)
  @ApiProperty({
    required: true,
  })
  score: number;
}
