import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { LangEnum } from 'src/common/constants/global.constant';
import { IsValidText } from 'src/common/decorators/custom-validator.decorator';
import { Default } from '../../../common/decorators/default-value.decorator';

export class CreateArticleCategoryDto {
  @ApiProperty()
  @IsValidText({ minLength: 3 })
  name: string;
}
