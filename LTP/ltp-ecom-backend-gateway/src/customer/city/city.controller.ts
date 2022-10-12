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
import { CustomerFindAllCitiesDto } from './dto/find-all-cities.dto';
import { ListCitiesEntity } from './entities/list-cities.entity';
import { CityService } from './city.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/city`)
@ApiTags('Customer City')
@UseInterceptors(ClassSerializerInterceptor)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/')
  @ApiOperation({ summary: 'Customer get list cities' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async register(@Query() reqData: CustomerFindAllCitiesDto) {
    return new ListCitiesEntity(await this.cityService.findAll(reqData));
  }
}
