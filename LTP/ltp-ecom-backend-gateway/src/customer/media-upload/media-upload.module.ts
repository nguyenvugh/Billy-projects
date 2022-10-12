import { Module } from '@nestjs/common';
import { MediaUploadService } from './media-upload.service';
import { MediaUploadController } from './media-upload.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [MediaUploadController],
  providers: [MediaUploadService],
})
export class MediaUploadModule {}
