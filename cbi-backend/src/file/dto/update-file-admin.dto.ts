import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BooleanEnum } from 'src/common/constants/global.constant';
import {
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';

export class UpdateFileDto {
  @ApiProperty()
  @IsValidText()
  key: string;

  @ApiProperty()
  @IsValidNumber()
  size: number;

  @ApiProperty()
  @ApiHideProperty()
  verified?: BooleanEnum = BooleanEnum.TRUE;

  @ApiProperty()
  @IsValidText()
  awsLambdaSecret: string;
}
