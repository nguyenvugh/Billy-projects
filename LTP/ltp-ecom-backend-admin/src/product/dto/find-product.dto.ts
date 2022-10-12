import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { BooleanValue } from 'src/common/constants';
import PaginateDto from 'src/common/dto/paginate.dto';

export class FindProductDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  category: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BooleanValue)
  status_display: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BooleanValue)
  is_feature: number;
}
