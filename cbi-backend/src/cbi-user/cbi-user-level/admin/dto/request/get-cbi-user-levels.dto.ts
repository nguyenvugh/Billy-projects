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
  IsEmpty,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';
import { GetCbiUserLevelsNeedConfirmScoreDto } from './get-cbi-user-levels-need-confirm-score.dto';

export class GetCbiUserLevelsDto extends GetCbiUserLevelsNeedConfirmScoreDto {
  @IsOptional()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: false,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  status_finish: BooleanStatusEnum;

  @IsOptional()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: false,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  status_admin_calculate_score: BooleanStatusEnum;
}
