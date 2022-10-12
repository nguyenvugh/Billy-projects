import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CbiQuestionOptionTypeEnum } from '../../../../cbi-question-option/constant';
import { GetCbiQuestionOptionValueResultDto } from '../../../../cbi-question-option-value/admin/dto/response/get-cbi-question-option-value-result.dto';

@Exclude()
export class GetCbiQuestionOptionResultDto {
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
}
