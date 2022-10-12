import { IntersectionType } from '@nestjs/swagger';
import { GroupRequiredDto } from '../../../../common/dto/req/field/group-required.dto';
import { PaginateDto } from '../../../../common/dto/req/paginate.dto';
import { SearchOptionalDto } from './field/search-optional.dto';

class RequestWithPaginateDto extends PaginateDto {}

export class AdminGetBannersDto extends IntersectionType(
  SearchOptionalDto,
  IntersectionType(RequestWithPaginateDto, GroupRequiredDto),
) {}
