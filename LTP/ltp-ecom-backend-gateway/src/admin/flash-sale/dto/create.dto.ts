import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateFlashSaleDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  start_date: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  end_date: Date;
}
