import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class DeleteMultiDto {
  @ApiProperty({
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  ids: string[];
}
