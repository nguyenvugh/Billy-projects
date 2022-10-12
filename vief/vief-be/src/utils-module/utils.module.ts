import { Module } from '@nestjs/common';
import { UploadService } from './services/upload-file.service';
import { HttpModule } from '@nestjs/axios';
import { UuidService } from './services/uuid.service';
import { TranscribeClient } from '@aws-sdk/client-transcribe';
import { TranslateService } from './services/translate.service';

@Module({
  imports: [HttpModule],
  providers: [UploadService, UuidService, TranscribeClient, TranslateService],
  exports: [UploadService, UuidService, TranslateService],
})
export class UtilsModule {}
