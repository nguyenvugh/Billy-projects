import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class ListDto {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  language_field: string;

  @ApiProperty()
  language_value: string;
}

export class CreateNewsDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  thumbnail_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  category_id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  author: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  features: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  status: number;

  @IsOptional()
  @ApiProperty({ required: false })
  scheduled_at: Date;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ required: true, type: [ListDto] })
  @Type(() => ListDto)
  contents: ListDto[];
}
