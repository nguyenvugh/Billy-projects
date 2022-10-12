import { Injectable } from '@nestjs/common';
import { AdminMicroserviceService } from '../admin-microservice/admin-microservice.service';
import { CreateAdminMediaUploadDto } from './dto/create-admin-media-upload.dto';
import { UpdateAdminMediaUploadDto } from './dto/update-admin-media-upload.dto';

@Injectable()
export class AdminMediaUploadService {
  constructor(
    private microserviceService: AdminMicroserviceService, // private i18n: I18nService,
  ) {}

  async upload(file: Express.Multer.File) {
    const result = await this.microserviceService.call(
      'admin-upload-one-media',
      file,
    );

    return result;
  }

  async uploadMulti(files: Array<Express.Multer.File>) {
    const result = await this.microserviceService.call(
      'admin-upload-multi-media',
      files,
    );

    return result;
  }

  findAll() {
    return `This action returns all adminMediaUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminMediaUpload`;
  }

  update(id: number, updateAdminMediaUploadDto: UpdateAdminMediaUploadDto) {
    return `This action updates a #${id} adminMediaUpload`;
  }

  async remove(id: number) {
    const result = await this.microserviceService.call(
      'admin-delete-one-media',
      id,
    );

    return result;
  }
}
