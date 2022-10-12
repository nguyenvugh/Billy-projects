import { Exclude, Expose, Type } from 'class-transformer';
import { FileAdminDto } from 'src/file/dto/file-admin.dto';
import { ClientDTO } from './client.dto';
import { UserCompanyDTO } from './user-company.dto';
import { UserDocumentDTO } from './user-document.dto';

@Exclude()
export class ProfileResDTO extends ClientDTO {
  @Expose()
  @Type(() => UserCompanyDTO)
  userCompany: UserCompanyDTO;

  @Expose()
  @Type(() => UserDocumentDTO)
  userDocument: UserDocumentDTO;

  @Expose()
  @Type(() => FileAdminDto)
  avatar: FileAdminDto;

  @Expose()
  @Type(() => String)
  lockReason: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
