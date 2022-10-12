import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class DeleteMultiArticleDto {
  // @IsString({ each: true })
  @ApiProperty()
  @IsNotEmpty()
  @ArrayNotEmpty()
  ids: string[];
}
