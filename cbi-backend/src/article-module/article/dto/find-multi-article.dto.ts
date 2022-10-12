import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import {
  ArticleStatus,
  LangEnum,
  UserRole,
} from 'src/common/constants/global.constant';
import {
  IsValidDate,
  IsValidEnum,
  IsValidNumber,
} from 'src/common/decorators/custom-validator.decorator';
import { Default } from 'src/common/decorators/default-value.decorator';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { CreateArticleDto } from './create-article.dto';

export class FindMultiArticleDto extends IntersectionType(
  PaginateDto,
  PartialType(PickType(CreateArticleDto, ['isFeature', 'idCategory'] as const)),
) {
  @IsValidEnum({ enum: LangEnum, required: false })
  @Default(LangEnum.En, { groups: [UserRole.ADMIN] })
  lang?: LangEnum;

  @IsValidDate({ required: false })
  @Default(new Date(), { groups: [UserRole.USER] })
  publishBefore?: Date;

  @IsValidNumber({ required: false })
  adminId?: number;

  @IsValidEnum({ enum: ArticleStatus, required: false })
  status?: ArticleStatus;
}
