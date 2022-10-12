import { Exclude, Expose, Type } from 'class-transformer';
import { BooleanEnum } from 'src/common/constants/global.constant';
class ImgSizeDto {
  @Expose()
  url: string;

  @Expose()
  width: number;

  @Expose()
  height: number;
}
@Exclude()
export class FileAdminDto {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  key: string;

  @Expose()
  bucket: string;

  @Expose()
  size: number;

  @Expose()
  verified: BooleanEnum;

  @Expose()
  url: string;
}
