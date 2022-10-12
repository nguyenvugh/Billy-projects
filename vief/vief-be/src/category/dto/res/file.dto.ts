import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CateThumbnailRes {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  url: string;
}
