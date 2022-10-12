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
  IsArray,
  ArrayMinSize,
  ArrayUnique,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReOrderCbiQuestionsDto {
  @ApiProperty({
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  cbi_question_ids: string[];
}
