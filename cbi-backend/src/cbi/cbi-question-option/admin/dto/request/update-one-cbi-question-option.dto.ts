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
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CbiQuestionOptionTypeEnum } from '../../../constant';
import { UpdateOneCbiQuestionOptionValueDto } from '../../../../cbi-question-option-value/admin/dto/request/update-one-cbi-question-option-value.dto';

export class UpdateOneCbiQuestionOptionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  id: string;

  @IsNotEmpty()
  @IsEnum(CbiQuestionOptionTypeEnum)
  @ApiProperty({
    required: true,
    enum: [
      CbiQuestionOptionTypeEnum.SINGLE_CHOICE,
      CbiQuestionOptionTypeEnum.MULTI_CHOICE,
      CbiQuestionOptionTypeEnum.ENTER_ANSWER,
      CbiQuestionOptionTypeEnum.UPLOAD_FILE,
    ],
  })
  type: CbiQuestionOptionTypeEnum;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateOneCbiQuestionOptionValueDto)
  @ApiProperty({
    required: true,
    type: [UpdateOneCbiQuestionOptionValueDto],
  })
  values: UpdateOneCbiQuestionOptionValueDto[];
}
