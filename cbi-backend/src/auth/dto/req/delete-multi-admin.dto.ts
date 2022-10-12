import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class DeleteMultiAdmin {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
