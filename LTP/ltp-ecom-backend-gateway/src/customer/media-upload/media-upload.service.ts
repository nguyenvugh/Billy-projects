import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class MediaUploadService {
  constructor(private microserviceService: MicroserviceService) {}

  async upload(file: Express.Multer.File) {
    return await this.microserviceService.call(
      'customer-media-upload-one-media',
      file,
    );
  }
}
