import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeactivateCustomerDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  reason: string;
}
