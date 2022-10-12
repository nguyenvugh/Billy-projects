import { Module } from '@nestjs/common';
import { MediaUploadService } from './media-upload.service';
import { FileController } from './media-upload.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaUploadRepository } from './repositories/media-upload.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MediaUploadRepository])],
  controllers: [FileController],
  providers: [MediaUploadService],
  exports: [MediaUploadService, TypeOrmModule],
})
export class MediaUploadModule {}
