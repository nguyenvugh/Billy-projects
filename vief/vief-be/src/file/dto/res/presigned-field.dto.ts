import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PresignedFieldRes {
  @ApiProperty()
  @Expose()
  bucket: string;

  @ApiProperty()
  @Expose()
  'X-Amz-Algorithm': number;

  @ApiProperty()
  @Expose()
  'X-Amz-Credential': string;

  @ApiProperty()
  @Expose()
  'X-Amz-Date': string;

  @ApiProperty()
  @Expose()
  key: string;

  @ApiProperty()
  @Expose()
  Policy: string;

  @ApiProperty()
  @Expose()
  'X-Amz-Signature': string;
}
