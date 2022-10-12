import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import PaginateDto from '../../common/dtos/paginate.dto';

export class FindAllOrdersDto extends PaginateDto {
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty({
    required: true,
    maxLength: 2,
  })
  lang: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  customer: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: false,
    maxLength: 255,
  })
  search: string;
}
