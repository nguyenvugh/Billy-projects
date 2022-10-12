import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmActivationCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    minLength: 1,
  })
  code: string;
}
