import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor } from '../../common/intercepters/file-to-body.intercepter';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateOneMediaDto } from './dto/create-one-media.dto';
import { MediaUploadEntity } from './entities/media-upload.entity';
import { MediaUploadService } from './media-upload.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/media-upload`)
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Customer media upload')
export class MediaUploadController {
  constructor(private readonly mediaUploadService: MediaUploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload one media' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  async upload(
    // @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateOneMediaDto,
  ) {
    return new MediaUploadEntity(
      await this.mediaUploadService.upload(body.file),
    );
  }
}
