import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MediaUploadService } from './media-upload.service';
import { MediaUploadController } from './media-upload.controller';
import { MediaUploadRepository } from './repository/media-upload.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MediaUploadRepository])],
  controllers: [MediaUploadController],
  providers: [MediaUploadService],
})
export class MediaUploadModule {}
