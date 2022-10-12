import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { AdminGetCbiQuestionOptionSubmittedResultDto } from '../../../../cbi-question-option/admin/dto/response/admin-get-cbi-question-option-submitted-result.dto';

@Exclude()
export class AdminGetCbiQuestionSubmittedResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({
    example: 1,
  })
  @Expose()
  order_display: number;

  @ApiProperty()
  @Expose()
  total_scores: number;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_answer_mandatory: BooleanStatusEnum;

  @ApiProperty({
    type: [AdminGetCbiQuestionOptionSubmittedResultDto],
  })
  @Type(() => AdminGetCbiQuestionOptionSubmittedResultDto)
  @Expose()
  options: AdminGetCbiQuestionOptionSubmittedResultDto[];
}
