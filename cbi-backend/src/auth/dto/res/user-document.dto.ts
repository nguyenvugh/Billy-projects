import { Exclude, Expose, Type } from 'class-transformer';
import { EUserStatus } from 'src/common/constants/global.constant';
import { FileAdminDto } from 'src/file/dto/file-admin.dto';

@Exclude()
export class UserDocumentDTO {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => FileAdminDto)
  file: FileAdminDto;

  constructor(partial: Partial<UserDocumentDTO>) {
    Object.assign(this, partial);
  }
}
