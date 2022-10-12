import { Type } from 'class-transformer';
import { AdminGetAdminResultDto } from './admin-get-admin-result.dto';

export class AdminGetAdminDetailResultDto {
  @Type(() => AdminGetAdminResultDto)
  data: AdminGetAdminResultDto;
}
