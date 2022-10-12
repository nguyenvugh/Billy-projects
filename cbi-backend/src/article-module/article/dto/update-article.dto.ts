import { PartialType, PickType } from '@nestjs/swagger';
import { LangEnum } from 'src/common/constants/global.constant';
import {
  IsValidArrayNumber,
  IsValidEnum,
  IsValidText,
  RequireAllField,
} from 'src/common/decorators/custom-validator.decorator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
