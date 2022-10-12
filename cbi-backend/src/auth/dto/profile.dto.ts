import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
export class ProfileDTO {
  @IsString()
  @ApiProperty()
  @Expose()
  readonly id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  readonly username: string;

  @IsEmail()
  @ApiProperty()
  @Expose()
  readonly email: string;

  @IsString()
  @ApiProperty()
  @Expose()
  readonly fullName: string;

  @IsString()
  @ApiProperty()
  @Expose()
  readonly phoneNumber: string;

  constructor(partial: Partial<ProfileDTO>) {
    Object.assign(this, partial);
  }
}
