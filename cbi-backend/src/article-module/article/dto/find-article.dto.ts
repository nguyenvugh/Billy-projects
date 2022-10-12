import { IsValidEnum } from 'src/common/decorators/custom-validator.decorator';
import { LangEnum } from '../../../common/constants/global.constant';

export class FindArticleDto {
  @IsValidEnum({ enum: LangEnum, required: false })
  lang?: LangEnum;
}
