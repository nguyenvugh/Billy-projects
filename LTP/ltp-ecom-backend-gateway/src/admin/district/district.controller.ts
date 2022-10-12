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
import { FindAllDistrictsDto } from './dto/find-all-districts.dto';
import { ListDistrictsEntity } from './entities/list-districts.entity';
import { DistrictService } from './district.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/district`)
@ApiTags('Admin District')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get('/')
  @ApiOperation({ summary: 'Admin get list districts' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @AuthToken() authorization: string,
    @Query() reqData: FindAllDistrictsDto,
  ) {
    return new ListDistrictsEntity(
      await this.districtService.findAll(authorization, reqData),
    );
  }
}
