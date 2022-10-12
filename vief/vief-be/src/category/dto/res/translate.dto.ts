import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResTranslates {
  @ApiProperty()
  @Expose()
  name: string;
}
