import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { LangEnum } from 'src/common/constants/global.constant';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { CreateArticleCategoryDto } from './create-article-category.dto';

export class FindMultiArticleCateDto extends IntersectionType(
  PaginateDto,
  PartialType(PickType(CreateArticleCategoryDto, [] as const)),
) {
  @IsValidEnum({ enum: LangEnum, required: false })
  lang?: LangEnum;

  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  creatorId: string;
}
