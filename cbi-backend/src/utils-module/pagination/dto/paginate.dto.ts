import {
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from 'src/common/constants/global.constant';
import { ApiProperty } from '@nestjs/swagger';

class PaginateDto {
  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  searchText: string = '';

  @ApiProperty({ default: DEFAULT_PAGE })
  @IsValidNumber({ required: false, min: 1 })
  page: number = DEFAULT_PAGE;

  @ApiProperty({ default: DEFAULT_LIMIT })
  @IsValidNumber({ required: false, min: 1 })
  limit: number = DEFAULT_LIMIT;
}

export default PaginateDto;
