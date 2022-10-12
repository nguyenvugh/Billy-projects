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
  Query,
  UseGuards,
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
import { CustomerFindAllDistrictsDto } from './dto/find-all-districts.dto';
import { ListDistrictsEntity } from './entities/list-districts.entity';
import { DistrictService } from './district.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/district`)
@ApiTags('Customer District')
@UseInterceptors(ClassSerializerInterceptor)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get('/')
  @ApiOperation({ summary: 'Customer get list districts' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async register(@Query() reqData: CustomerFindAllDistrictsDto) {
    return new ListDistrictsEntity(await this.districtService.findAll(reqData));
  }
}
