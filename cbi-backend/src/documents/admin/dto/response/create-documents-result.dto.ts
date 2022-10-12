import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDTO } from 'src/auth/dto/user.dto';
import { FileAdminDto } from 'src/file/dto/file-admin.dto';

export class CreateDocumentsResultDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({
    type: [UserDTO],
  })
  @Type(() => UserDTO)
  @Expose()
  createdBy: UserDTO;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  @Type(() => FileAdminDto)
  file: FileAdminDto;
}
