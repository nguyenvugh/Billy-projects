import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
export class LoginDTO {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  readonly usernameOrEmail: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  readonly password: string;

  constructor(partial: Partial<LoginDTO>) {
    Object.assign(this, partial);
  }
}
