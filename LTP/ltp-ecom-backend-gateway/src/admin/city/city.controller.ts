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
import { AuthToken } from '../../common/decorators/auth-token.decorator';
import { FindAllCitiesDto } from './dto/find-all-cities.dto';
import { ListCitiesEntity } from './entities/list-cities.entity';
import { CityService } from './city.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/city`)
@ApiTags('Admin City')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/')
  @ApiOperation({ summary: 'Admin get list cities' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @AuthToken() authorization: string,
    @Query() reqData: FindAllCitiesDto,
  ) {
    return new ListCitiesEntity(
      await this.cityService.findAll(authorization, reqData),
    );
  }
}
