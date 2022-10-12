import { LangEnum } from 'src/common/constants/global.constant';
import { IsValidEnum } from 'src/common/decorators/custom-validator.decorator';

export class FindArticleCategoryDto {
  @IsValidEnum({ enum: LangEnum, required: false })
  lang?: LangEnum;
}
