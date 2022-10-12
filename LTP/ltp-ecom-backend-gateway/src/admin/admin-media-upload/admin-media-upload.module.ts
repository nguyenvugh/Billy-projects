import { Module } from '@nestjs/common';
import { AdminMediaUploadService } from './admin-media-upload.service';
import { AdminMediaUploadController } from './admin-media-upload.controller';
import { AdminMicroserviceModule } from '../admin-microservice/admin-microservice.module';

@Module({
  imports: [AdminMicroserviceModule],
  controllers: [AdminMediaUploadController],
  providers: [AdminMediaUploadService],
})
export class AdminMediaUploadModule {}
