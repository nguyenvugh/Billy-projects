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

export class SubmitOneCbiUserQuestionAnswerDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  cbi_question_id: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  cbi_question_option_id: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  cbi_question_option_value_id: string;

  @IsNotEmpty()
  // TODO: validate decimal number with two decimal places
  @IsNumber()
  @Min(0)
  @ApiProperty({
    required: false,
  })
  score: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    required: false,
  })
  content_answer: string;
}
