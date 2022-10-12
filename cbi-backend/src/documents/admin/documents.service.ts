import { Injectable } from '@nestjs/common';
import { AdminJwtDto } from 'src/auth/dto/admin-jwt.dto';
import { DeleteMultiDto } from 'src/common/dto/request/delete-multi.dto';
import {
  BadRequestExc,
  ConflictExc,
} from 'src/common/exceptions/custom.exception';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { toListResponse } from 'src/common/utils';
import { FileAdminService } from 'src/file/service/file-admin.service';
import { DocumentsRepository } from '../repository/documents.repository';
import { CreateOneDocumentsDto } from './dto/request/create-one-documents.dto';
import { GetDocumentsDto } from './dto/request/get-documents.dto';

@Injectable()
export class DocumentsService {
  constructor(
    private documentsRepo: DocumentsRepository,
    private fileAdminService: FileAdminService,
  ) {}

  async getDocuments(reqData: GetDocumentsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const { data, total } = await this.documentsRepo.getAllDocument(
      reqData.searchText,
      offset,
      limit,
    );
    return toListResponse(data, total, limit);
  }

  async createDocuments(
    { title, fileId }: CreateOneDocumentsDto,
    user: AdminJwtDto,
  ) {
    const file = await this.fileAdminService.findOneOrError(fileId);
    const existedDoc = await this.documentsRepo.findOne({ title });
    if (existedDoc) {
      throw new ConflictExc('Tên tài liệu đã bị trùng lặp');
    }
    return await this.documentsRepo.save({ title, file, createdBy: user });
  }

  async deleteMultiDocuments({ ids }: DeleteMultiDto) {
    return await this.documentsRepo.deleteDocument(ids);
  }
}
