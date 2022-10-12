import { AuthAdminReq } from '../../auth/decorator/auth-req.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateFileAdminDto } from '../dto/create-file-admin.dto';
import { CreatePresignUrlDto } from '../dto/create-presign-url.dto';
import { FindFileAdminDto } from '../dto/find-file-admin.dto';
import { UpdateFileDto } from '../dto/update-file-admin.dto';
import { FileAdminService } from '../service/file-admin.service';
import { AdminJwtDto } from '../../auth/dto/admin-jwt.dto';
import { CustomParseIntPipe } from '../../common/pipes/custom-parse-int.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public-api.decorator';
import { UserJwtDto } from 'src/auth/dto/req/user-jwt.dto';

@Controller({ path: 'file-admin' })
@ApiTags('File Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FileAdminController {
  constructor(private readonly fileService: FileAdminService) {}

  @Post('presign-url')
  createPresignUrl(
    @Body() createPresignUrlDto: CreatePresignUrlDto,
    @AuthAdminReq() user: UserJwtDto,
  ) {
    return this.fileService.createPresignUpload(createPresignUrlDto, user);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
    },
  })
  @Post('/url')
  @Public()
  uploadFromUrl(@Body('url') url: string) {
    return this.fileService.uploadFromUrl(url);
  }

  @Get('find-all')
  findAll(@Query() params: FindFileAdminDto) {
    return this.fileService.findAll(params);
  }

  @Get('find:id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOneOrError(id);
  }

  // @Patch(':key')
  // update(@Param('key') key: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.fileService.updateWith(key, updateFileDto);
  // }

  // Public this API to update file info from Aws lambda
  // OR we will using a secret key from aws to validate.
  @Public()
  @Patch()
  updateAwsLambda(@Body() updateFileDto: UpdateFileDto) {
    return this.fileService.updateWith(updateFileDto);
  }

  @Delete('delete:id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
