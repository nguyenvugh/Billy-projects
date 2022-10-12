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
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CreateGroupDto } from './dto/create.dto';
import { GroupService } from './group.service';
import { FindAllGroupDto } from './dto/find-all.dto';
import { DeleteGroupDto } from './dto/delete.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/group`)
@ApiTags('Admin Group Management')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Get()
  @ApiOperation({ summary: 'Find all group' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindAllGroupDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.groupService.findAll(authorization, request);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new group' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateGroupDto,
  })
  async create(
    @Body() createBody: CreateGroupDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.groupService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.groupService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update group' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateGroupDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateGroupDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.groupService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete group' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteGroupDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.groupService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
