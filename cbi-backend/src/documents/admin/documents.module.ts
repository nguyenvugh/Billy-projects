import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { DocumentsRepository } from '../repository/documents.repository';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsRepository]), FileModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
