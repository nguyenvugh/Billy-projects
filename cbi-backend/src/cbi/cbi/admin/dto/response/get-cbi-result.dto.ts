import { Exclude, Expose, Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreatedByResultDto } from '../../../../../common/dto/response/created-by-result.dto';
import { GetImageUploadResultDto } from '../../../../../file/dto/response/get-image-upload-result.dto';

@Exclude()
export class GetCbiResultDto {
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

  @ApiProperty()
  @Expose()
  total_levels: number;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Expose()
  updated_at: Date;

  @Type(() => CreatedByResultDto)
  @ApiProperty({
    type: CreatedByResultDto,
  })
  @Expose()
  created_by: CreatedByResultDto;
}
