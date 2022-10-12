import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MediaUploadService } from './media-upload.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: MediaUploadService) {}

  @MessagePattern('admin-upload-one-media')
  upload(@Payload() file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @MessagePattern('admin-upload-multi-media')
  uploadMulti(@Payload() files: Array<Express.Multer.File>) {
    return this.fileService.uploadMulti(files);
  }

  @MessagePattern('admin-delete-one-media')
  deleteOne(@Payload() id: number) {
    console.log('id', id);
    return this.fileService.deleteFile(id);
  }

  // @Get()
  // findAll() {
  //   return this.fileService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fileService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.fileService.update(+id, updateFileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fileService.remove(+id);
  // }
}
