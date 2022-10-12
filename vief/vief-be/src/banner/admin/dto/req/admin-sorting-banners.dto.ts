import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ArrayMinSize } from 'class-validator';

export class AdminSortingBannersDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    required: true,
    type: [Number],
  })
  ids: number[];
}
