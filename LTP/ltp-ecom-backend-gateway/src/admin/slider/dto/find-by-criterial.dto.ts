import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortValueConst } from 'src/common/constants/sorting.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindSliderByCriteriaDto extends PaginateDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  sort_field: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: [SortValueConst.ASC, SortValueConst.DESC],
  })
  sort_type: SortValueConst;
}
