import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@Exclude()
class Register {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phone: string;
}

export class ResGetRegisterByAdmin {
  @ApiProperty()
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Register)
  data: Register;

  @ApiProperty()
  @Expose()
  total: number;
}
