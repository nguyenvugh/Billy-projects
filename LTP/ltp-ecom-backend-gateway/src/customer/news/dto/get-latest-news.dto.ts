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
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(10)
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 10,
    example: 3,
  })
  limit: number;
}
