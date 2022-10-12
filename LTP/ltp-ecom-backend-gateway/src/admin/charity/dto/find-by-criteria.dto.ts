import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CharitySearchStatusConst } from 'src/common/constants/charity.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindCharityByCriteriaDto extends PaginateDto {
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
    enum: [
      CharitySearchStatusConst.HAPPENING,
      CharitySearchStatusConst.UPCOMING,
      CharitySearchStatusConst.EXPIRED,
    ],
  })
  status: number;
}
