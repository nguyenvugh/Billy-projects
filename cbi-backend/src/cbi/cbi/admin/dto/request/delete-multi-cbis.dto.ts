import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class DeleteMultiCbisDto {
  @ApiProperty({
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  ids: string[];
}
