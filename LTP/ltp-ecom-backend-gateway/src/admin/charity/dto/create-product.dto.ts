import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCharityProductRequirementDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  product: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  percentage: number;
}
