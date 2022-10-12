import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileToBodyInterceptor } from 'src/common/intercepters/file-to-body.intercepter';
import { MultiFileToBodyInterceptor } from 'src/common/intercepters/multi-file-to-body.intercepter';
import { AdminMediaUploadService } from './admin-media-upload.service';
import {
  CreateAdminMediaUploadDto,
  CreateMultiAdminMediaUploadDto,
} from './dto/create-admin-media-upload.dto';
import { UpdateAdminMediaUploadDto } from './dto/update-admin-media-upload.dto';

@Controller('admin-media-upload')
@ApiTags('admin-media-upload')
export class AdminMediaUploadController {
  constructor(
    private readonly adminMediaUploadService: AdminMediaUploadService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  upload(
    // @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateAdminMediaUploadDto,
  ) {
    return this.adminMediaUploadService.upload(body.file);
  }

  @Post('files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'), MultiFileToBodyInterceptor)
  uploadMulti(@Body() body: CreateMultiAdminMediaUploadDto) {
    return this.adminMediaUploadService.uploadMulti(body.files);
  }

  // @Get()
  // findAll() {
  //   return this.adminMediaUploadService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminMediaUploadService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdminMediaUploadDto: UpdateAdminMediaUploadDto,
  // ) {
  //   return this.adminMediaUploadService.update(+id, updateAdminMediaUploadDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminMediaUploadService.remove(id);
  }
}
