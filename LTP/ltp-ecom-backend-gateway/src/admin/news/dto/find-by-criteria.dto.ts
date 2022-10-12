import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
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
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [
      NewsStatusConst.DRAFT,
      NewsStatusConst.PUBLISHED,
      NewsStatusConst.SCHEDULED,
    ],
  })
  status: number;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  category: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [0, 1],
  })
  is_public_features: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [0, 1],
  })
  is_private_features: number;

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
  sort_type: string;
}
