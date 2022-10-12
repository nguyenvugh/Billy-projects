import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AdminGetCbiUserQuestionAnswerResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  cbi_question_option_value_id: string;

  @ApiProperty()
  @Expose()
  score: number;

  @ApiProperty()
  @Expose()
  content_answer: string;
}
