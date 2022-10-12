import { ApiProperty } from '@nestjs/swagger';
import { DEPARTMENT_NAME } from '../../../common/constants/global.constant';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class GetAllDocumentDto {
  @ApiProperty({ required: false })
  @IsValidEnum({ enum: DEPARTMENT_NAME, required: false })
  field: DEPARTMENT_NAME;

  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  shortDesc: string;

  @ApiProperty({ required: true })
  @IsValidNumber()
  page: number;

  @ApiProperty({ required: true })
  @IsValidNumber()
  size: number;
}
