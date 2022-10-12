import { ApiProperty } from '@nestjs/swagger';
import { SupportFileType } from 'src/common/constants/global.constant';
import { IsValidEnum } from 'src/common/decorators/custom-validator.decorator';

export class CreatePresignUrlDto {
  @ApiProperty()
  @IsValidEnum({ enum: SupportFileType })
  type: SupportFileType;
}
