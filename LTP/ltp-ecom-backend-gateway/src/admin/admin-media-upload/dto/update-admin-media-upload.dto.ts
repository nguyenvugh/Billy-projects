import { PartialType } from '@nestjs/swagger';
import { CreateAdminMediaUploadDto } from './create-admin-media-upload.dto';

export class UpdateAdminMediaUploadDto extends PartialType(
  CreateAdminMediaUploadDto,
) {}
