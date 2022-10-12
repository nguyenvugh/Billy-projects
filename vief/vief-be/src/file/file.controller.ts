import {
  Body,
  Controller,
  Delete,
  Get,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SupportFileType } from '../common/constants/global.constant';
import { ManualSerialize } from '../common/interceptors/serialize.interceptor';
import { CreateFileRes } from './dto/res/create-file-res.dto';
import { FileService } from './file.service';

@Controller('file')
@ApiTags('File')
// @UseGuards(FirebaseAuthenGuard)
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: { type: { type: 'string' }, fileName: { type: 'string' } },
    },
  })
  @ApiOperation({ summary: 'get presigned info to upload image s3' })
  @ApiOkResponse({ type: CreateFileRes })
  @ManualSerialize(CreateFileRes)
  @Post('presigned-url')
  createPresignUrl(
    @Body('type') type: SupportFileType,
    @Body('fileName') fileName: string,
  ) {
    return this.fileService.createPresignUpload(type, fileName);
  }

  @Delete()
  deleteFiles(@Body('ids', ParseArrayPipe) ids: number[]) {
    return this.fileService.deleteMultipleFiles(ids);
  }

  @Get('/download-url')
  getDownloadUrl(@Query('key') key: string) {
    return this.fileService.getDownloadFileUrl(key);
  }
}
