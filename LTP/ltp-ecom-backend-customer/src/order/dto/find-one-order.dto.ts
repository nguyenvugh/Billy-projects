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

export class FindOneOrderDto {
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
    required: true,
    type: Number,
  })
  customer: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  id: number;
}
