import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { ListOfficesEntity } from './entities/list-offices.entity';
import { OfficeService } from './office.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/office`)
@ApiTags('Customer Office')
@UseInterceptors(ClassSerializerInterceptor)
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  @ApiOperation({ summary: 'Get list offices on web customer' })
  async findAllOffices() {
    return new ListOfficesEntity(await this.officeService.findAllOffices());
  }
}
