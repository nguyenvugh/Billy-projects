import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNumber } from 'class-validator';

export class DeleteMultiEmailSubscriptionDto {
  @ApiProperty({ required: true })
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  ids: number[];
}
