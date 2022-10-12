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
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetLatestNewsDto {
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty({
    required: true,
    maxLength: 2,
  })
  lang: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(10)
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 10,
  })
  limit: number;
}
