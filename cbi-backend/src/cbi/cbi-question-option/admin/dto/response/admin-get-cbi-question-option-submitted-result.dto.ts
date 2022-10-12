import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CbiQuestionOptionTypeEnum } from '../../../constant';
import { GetCbiQuestionOptionValueResultDto } from '../../../../cbi-question-option-value/admin/dto/response/get-cbi-question-option-value-result.dto';
import { AdminGetCbiUserQuestionAnswerResultDto } from '../../../../../cbi-user/cbi-user-question-answer/admin/dto/response/admin-get-cbi-user-question-answer-result.dto';

@Exclude()
export class AdminGetCbiQuestionOptionSubmittedResultDto {
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
    type: [AdminGetCbiUserQuestionAnswerResultDto],
  })
  @Type(() => AdminGetCbiUserQuestionAnswerResultDto)
  @Expose()
  answers: AdminGetCbiUserQuestionAnswerResultDto[];
}
