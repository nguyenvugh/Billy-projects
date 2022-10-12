import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class ListDto {
  @ApiProperty({ required: true })
  language_code: string;

  @ApiProperty({ required: true })
  language_field: string;

  @ApiProperty({ required: true })
  language_value: string;
}

export class CreateNewsCategoryDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ required: true, type: [ListDto] })
  @Type(() => ListDto)
  contents: ListDto[];
}
