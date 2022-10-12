import { Type } from 'class-transformer';
import { AdminGetAdminResultDto } from './admin-get-admin-result.dto';

export class AdminGetAdminsResultDto {
  @Type(() => AdminGetAdminResultDto)
  data: AdminGetAdminResultDto[];

  total: number;
}
