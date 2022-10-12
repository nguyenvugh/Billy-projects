import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => value.split(',').map((idStr) => +idStr))
  ids: number[];
}
