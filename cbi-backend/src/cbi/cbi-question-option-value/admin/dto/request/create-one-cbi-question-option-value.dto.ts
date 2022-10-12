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
import { BooleanStatusEnum } from '../../../../../common/constants/global.constant';

export class CreateOneCbiQuestionOptionValueDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  cbi_question_option_id: string;

  @IsEmpty()
  order_display: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    required: true,
  })
  title: string;

  @IsNotEmpty()
  // TODO: validate decimal number with two decimal places
  @IsNumber()
  @Min(0)
  @ApiProperty({
    required: false,
  })
  score: number;

  @IsOptional()
  @IsEnum(BooleanStatusEnum)
  @ApiProperty({
    required: false,
    enum: [BooleanStatusEnum.FALSE, BooleanStatusEnum.TRUE],
  })
  status_right_option_value: BooleanStatusEnum;
}
