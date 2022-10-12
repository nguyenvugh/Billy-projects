import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CbiQuestionOptionTypeEnum } from '../../../constant';
import { GetCbiQuestionOptionValueResultDto } from '../../../../cbi-question-option-value/admin/dto/response/get-cbi-question-option-value-result.dto';
import { GetCbiUserQuestionAnswerResultDto } from '../../../../../cbi-user/cbi-user-question-answer/user/dto/response/get-cbi-user-question-answer-result.dto';

@Exclude()
export class UserGetCbiQuestionOptionResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({
    enum: [
      CbiQuestionOptionTypeEnum.SINGLE_CHOICE,
      CbiQuestionOptionTypeEnum.MULTI_CHOICE,
      CbiQuestionOptionTypeEnum.ENTER_ANSWER,
      CbiQuestionOptionTypeEnum.UPLOAD_FILE,
    ],
  })
  @Expose()
  type: CbiQuestionOptionTypeEnum;

  @ApiProperty()
  @Expose()
  order_display: number;

  @ApiProperty({
    type: [GetCbiQuestionOptionValueResultDto],
  })
  @Type(() => GetCbiQuestionOptionValueResultDto)
  @Expose()
  values: GetCbiQuestionOptionValueResultDto[];

  @ApiProperty({
    type: [GetCbiUserQuestionAnswerResultDto],
  })
  @Type(() => GetCbiUserQuestionAnswerResultDto)
  @Expose()
  answer: GetCbiUserQuestionAnswerResultDto[];
}
