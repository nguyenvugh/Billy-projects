import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import {
  NewsFeaturesConst,
  NewsStatusConst,
} from 'src/common/constants/news.constant';

export class ListDto {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  language_field: string;

  @ApiProperty()
  language_value: string;
}

export class CreateNewsDto {
  @IsOptional()
  id: number;

  @IsOptional()
  thumbnail_id: number;

  @IsOptional()
  category_id: number;

  @IsOptional()
  author: string;

  @IsNotEmpty()
  features: NewsFeaturesConst;

  @IsNotEmpty()
  status: NewsStatusConst;

  @IsOptional()
  scheduled_at: Date;

  @IsNotEmpty()
  @Type(() => ListDto)
  contents: [ListDto];
}
