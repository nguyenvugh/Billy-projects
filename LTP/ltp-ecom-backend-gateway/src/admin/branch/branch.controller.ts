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
import { CreateBranchDto } from './dto/create.dto';
import { DeleteBranchDto } from './dto/delete.dto';
import { FindAllBranchDto } from './dto/find-all.dto';
import { BranchService } from './branch.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/branch`)
@ApiTags('Admin Branch Management')
@ApiBearerAuth()
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Get()
  @ApiOperation({ summary: 'Find all branch' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindAllBranchDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.branchService.findAll(authorization, request);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new branch' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateBranchDto,
  })
  async create(
    @Body() createBody: CreateBranchDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.branchService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get branch detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.branchService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update branch' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateBranchDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateBranchDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.branchService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete branch' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteBranchDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.branchService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
