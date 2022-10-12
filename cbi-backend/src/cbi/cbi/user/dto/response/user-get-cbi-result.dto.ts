import { Exclude, Expose, Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { GetImageUploadResultDto } from '../../../../../file/dto/response/get-image-upload-result.dto';

@Exclude()
export class UserGetCbiResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty({
    type: GetImageUploadResultDto,
  })
  @Type(() => GetImageUploadResultDto)
  @Expose()
  thumbnail: GetImageUploadResultDto;
}
