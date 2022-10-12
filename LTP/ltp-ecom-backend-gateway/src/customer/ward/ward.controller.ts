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
import { FindAllWardsDto } from './dto/find-all-wards.dto';
import { ListWardsEntity } from './entities/list-wards.entity';
import { WardService } from './ward.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/ward`)
@ApiTags('Customer Ward')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get('/')
  @ApiOperation({ summary: 'Customer get list wards' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async register(@Query() reqData: FindAllWardsDto) {
    return new ListWardsEntity(await this.wardService.findAll(reqData));
  }
}
