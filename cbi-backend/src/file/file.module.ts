import { Module } from '@nestjs/common';
import { FileAdminService } from './service/file-admin.service';
import { FileAdminController } from './controller/file-admin.controller';
import { UploadService } from './service/upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAdmin } from './entities/file-admin.entity';
import { UtilsModule } from '../utils-module/utils.module';
import { HttpModule } from '@nestjs/axios';
import { FileAdminSubscriber } from './subscriber/file-admin.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([FileAdmin]), UtilsModule, HttpModule],
  controllers: [FileAdminController],
  providers: [FileAdminService, UploadService, FileAdminSubscriber],
  exports: [TypeOrmModule, FileAdminService],
})
export class FileModule {}
