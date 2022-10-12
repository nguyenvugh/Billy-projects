import { ApiProperty } from '@nestjs/swagger';
import {
  DEPARTMENT_NAME,
  TIMELINE_EVENT,
} from '../../../common/constants/global.constant';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class GetListEventsDto {
  @ApiProperty({ required: false })
  @IsValidEnum({ enum: DEPARTMENT_NAME, required: false })
  field: DEPARTMENT_NAME;

  @ApiProperty({ required: false })
  @IsValidNumber({ required: false })
  isFeature: number;

  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  title: string;

  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  location: string;

  @ApiProperty({ required: false })
  @IsValidEnum({ enum: TIMELINE_EVENT, required: false })
  timeline: TIMELINE_EVENT;

  @ApiProperty({ required: false })
  @IsValidNumber({ required: false })
  page: number;

  @ApiProperty({ required: false })
  @IsValidNumber({ required: false })
  size: number;
}
