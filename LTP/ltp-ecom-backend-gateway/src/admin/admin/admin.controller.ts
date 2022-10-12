import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  Headers,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create.dto';
import { DeleteAdminDto } from './dto/delete.dto';
import { FindAllAdmin } from './dto/find-all.dto';
import { UpdateAdminDto } from './dto/update.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/admin`)
@ApiTags('Admin Admin Management')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get()
  @ApiOperation({ summary: 'Find all admin' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @Query() request: FindAllAdmin,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.adminService.findAll(authorization, request);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new admin' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateAdminDto,
  })
  async create(
    @Body() createBody: CreateAdminDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.adminService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.adminService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admin' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateAdminDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: UpdateAdminDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.adminService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete admin' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteAdminDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.adminService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
