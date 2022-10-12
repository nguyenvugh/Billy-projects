import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MediaUploadService } from './media-upload.service';

@Controller('media-upload')
export class MediaUploadController {
  constructor(private readonly mediaUploadService: MediaUploadService) {}

  @MessagePattern('customer-media-upload-one-media')
  upload(@Payload() file: Express.Multer.File) {
    return this.mediaUploadService.upload(file);
  }
}
