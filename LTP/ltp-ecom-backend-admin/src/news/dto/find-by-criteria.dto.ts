import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { NewsStatusConst } from 'src/common/constants/news.constant';
import { SortValueConst } from 'src/common/constants/sorting.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindNewsByCriteriaDto extends PaginateDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  search_value: string;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: NewsStatusConst,
  })
  status: NewsStatusConst;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  category: number;

  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  is_public_features: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  is_private_features: boolean;

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
