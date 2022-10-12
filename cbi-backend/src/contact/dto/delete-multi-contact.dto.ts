import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class DeleteMultiContact {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
