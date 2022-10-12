import { ApiProperty } from '@nestjs/swagger';
import { DEPARTMENT_NAME } from '../../../common/constants/global.constant';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class GetAllBannerDto {
  @ApiProperty({ required: false })
  @IsValidEnum({ enum: DEPARTMENT_NAME, required: false })
  field: DEPARTMENT_NAME;

  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  title: string;

  @ApiProperty({ required: true })
  @IsValidNumber({ required: false })
  page: number;

  @ApiProperty({ required: true })
  @IsValidNumber({ required: false })
  size: number;
}
