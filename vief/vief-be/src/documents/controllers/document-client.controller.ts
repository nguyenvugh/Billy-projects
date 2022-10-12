import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangEnum } from '../../common/constants/global.constant';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { DocumentService } from '../document.service';
import { GetAllDocumentDto } from '../dto/req/get-all-document.dto';
import { ResGetListDocument } from '../dto/res/get-list-document.dto';

@ApiTags('Client Documents')
@Controller('client/documents')
export class DocumentClientController {
  constructor(private readonly documentService: DocumentService) {}
  @Get()
  @ManualSerialize(ResGetListDocument)
  async getAll(
    @Query() document: GetAllDocumentDto,
    @Headers('lang') lang: LangEnum,
  ) {
    return this.documentService.getAllDocumentClient(document, lang);
  }
}
