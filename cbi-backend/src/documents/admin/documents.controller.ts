import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthAdminReq } from 'src/auth/decorator/auth-req.decorator';
import { AdminJwtDto } from 'src/auth/dto/admin-jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PrefixServiceEnum } from 'src/common/constants/global.constant';
import { Public } from 'src/common/decorators/public-api.decorator';
import { DeleteMultiDto } from 'src/common/dto/request/delete-multi.dto';
import { ManualSerialize } from 'src/common/interceptors/serialize.interceptor';
import { DocumentsService } from './documents.service';
import { CreateOneDocumentsDto } from './dto/request/create-one-documents.dto';
import { GetDocumentsDto } from './dto/request/get-documents.dto';
import { CreateDocumentsResultDto } from './dto/response/create-documents-result.dto';
import { GetDocumentsResultDto } from './dto/response/get-documents-result.dto';

@Controller(`${PrefixServiceEnum.ADMIN}/documents`)
@ApiTags('Documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ManualSerialize(GetDocumentsResultDto)
  @ApiOperation({ summary: 'Manage list documents' })
  @ApiOkResponse({ type: GetDocumentsResultDto })
  @Public()
  async getUserDocument(@Query() params: GetDocumentsDto) {
    return await this.documentsService.getDocuments(params);
  }

  @Post()
  @ManualSerialize(CreateDocumentsResultDto)
  @ApiOperation({ summary: 'Create documents' })
  @ApiOkResponse({ type: CreateDocumentsResultDto })
  async createDocuments(
    @Body() payload: CreateOneDocumentsDto,
    @AuthAdminReq() user: AdminJwtDto,
  ) {
    return await this.documentsService.createDocuments(payload, user);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete documents' })
  @ApiOkResponse({ type: Number })
  async deleteMultiDocuments(@Body() payload: DeleteMultiDto) {
    return await this.documentsService.deleteMultiDocuments(payload);
  }
}
