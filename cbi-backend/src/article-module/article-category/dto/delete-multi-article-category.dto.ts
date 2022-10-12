import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteMultiCategoryArticle {
  @IsArray()
  @ApiProperty()
  ids: string[];
}
