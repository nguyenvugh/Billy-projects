import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';
import { UtilsModule } from '../utils-module/utils.module';
import { DocumentService } from './document.service';
import { DocumentAdminController } from './controllers/document-admin.controller';
import { DocumentClientController } from './controllers/document-client.controller';
import { DocumentsTranslation } from './entities/documents-translation.entity';
import { Documents } from './entities/documents.entity';
import { DocumentTranslationRepository } from './repository/document-translate.repository';
import { DocumentsRepository } from './repository/document.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileRepository,
      Documents,
      DocumentsRepository,
      DocumentsTranslation,
      DocumentTranslationRepository,
    ]),
    UtilsModule,
    HttpModule,
  ],

  controllers: [DocumentAdminController, DocumentClientController],
  providers: [DocumentService, FileService],
})
export class DocumentModule {}
