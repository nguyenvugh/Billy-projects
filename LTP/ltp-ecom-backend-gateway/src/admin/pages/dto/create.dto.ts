import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class PageTranslateItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_field: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_value: string;
}

export class CreatePageDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ required: true, type: [PageTranslateItemDto] })
  @Type(() => PageTranslateItemDto)
  contents: [PageTranslateItemDto];
}
