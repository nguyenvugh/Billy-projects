import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    required: true,
    minLength: 1,
  })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    required: true,
    minLength: 8,
  })
  readonly password: string;
}
