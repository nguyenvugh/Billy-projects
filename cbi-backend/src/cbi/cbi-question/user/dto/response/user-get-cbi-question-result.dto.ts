import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { UserGetCbiQuestionOptionResultDto } from '../../../../cbi-question-option/user/dto/response/user-get-cbi-question-option-result.dto';

@Exclude()
export class UserGetCbiQuestionResultDto {
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
    type: [UserGetCbiQuestionOptionResultDto],
  })
  @Type(() => UserGetCbiQuestionOptionResultDto)
  @Expose()
  options: UserGetCbiQuestionOptionResultDto[];
}
