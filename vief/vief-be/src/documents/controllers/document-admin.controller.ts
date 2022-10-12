import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { DocumentService } from '../document.service';
import { CreateDocumentDto } from '../dto/req/create-document.dto';
import { EditDocumentDto } from '../dto/req/edit-document.dto';
import { GetAllDocumentDto } from '../dto/req/get-all-document.dto';
import { ResGetListDocument } from '../dto/res/get-list-document.dto';

@Controller('admin/documents')
@ApiTags('Admin Documents')
export class DocumentAdminController {
  constructor(private readonly documentService: DocumentService) {}
  @Post()
  @ApiOperation({ summary: 'Create document' })
  async createDocument(@Body() document: CreateDocumentDto) {
    return this.documentService.createDocument(document);
  }

  @Get()
  @ApiOperation({ summary: 'Get all document for admin' })
  @ManualSerialize(ResGetListDocument)
  async getAll(@Query() document: GetAllDocumentDto) {
    return this.documentService.getAllDocumentByAdmin(document);
  }

  @Delete()
  @ApiBody({
    schema: {
      type: 'object',
      properties: { ids: { type: 'array', default: [1, 2] } },
    },
  })
  @ApiOperation({ summary: 'Delete multiple documents' })
  async deleteDocument(@Body('ids', ParseArrayPipe) ids: number[]) {
    return this.documentService.deleteDocuments(ids);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit document' })
  async updateDocument(
    @Body() document: EditDocumentDto,
    @Param('id') id: number,
  ) {
    return this.documentService.editDocument(document, id);
  }
}
