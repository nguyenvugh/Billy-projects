import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class ListDto {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  language_field: string;

  @ApiProperty()
  language_value: string;
}

export class CreateNewsCategoryDto {
  @IsArray()
  @Type(() => ListDto)
  contents: ListDto[];
}
