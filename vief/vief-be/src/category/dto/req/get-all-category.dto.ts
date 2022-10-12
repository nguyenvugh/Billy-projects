import { ApiProperty } from '@nestjs/swagger';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
  SECTIONS_NAME,
} from '../../../common/constants/global.constant';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class GetAllCategoryDto {
  @ApiProperty({ required: false })
  @IsValidEnum({ enum: SECTIONS_NAME, required: false })
  type: SECTIONS_NAME;

  @ApiProperty({ required: false })
  @IsValidEnum({ enum: DEPARTMENT_NAME, required: false })
  field: DEPARTMENT_NAME;

  @ApiProperty({ required: false })
  @IsValidNumber({ required: false })
  isFeature: number;

  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  name: string;

  @ApiProperty({ required: false })
  @IsValidNumber({ required: false, min: 1 })
  page: number;

  @ApiProperty({ required: false })
  @IsValidNumber({ required: false })
  size: number;
}
