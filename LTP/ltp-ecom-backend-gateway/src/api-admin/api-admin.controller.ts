import { Controller, Get } from '@nestjs/common';
import {
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiAdminService } from './api-admin.service';

@Controller('api-admin')
@ApiTags('Manage APIs admin')
export class ApiAdminController {
  constructor(private readonly apiAdminService: ApiAdminService) {}

  @Get('/test')
  @ApiOperation({ summary: 'Test' })
  test() {
    return this.apiAdminService.test();
  }
}
