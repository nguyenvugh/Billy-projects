import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';

@Exclude()
export class GetCbiLevelResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty({
    example: 1,
  })
  @Expose()
  level: number;

  @ApiProperty()
  @Expose()
  total_questions: number;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  auto_calculate_score: BooleanStatusEnum;

  @ApiProperty({
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  @Expose()
  status_publish: BooleanStatusEnum;
}
