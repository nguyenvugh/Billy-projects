import { FileType } from 'src/common/constants/global.constant';
import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';

export class CreateFileAdminDto {
  @IsValidText()
  key: string;

  @IsValidText()
  baseUrl: string;

  @IsValidText()
  bucket: string;

  @IsValidText()
  uploaderId: string;

  @IsValidEnum({ enum: FileType, required: false })
  type?: FileType;
}
