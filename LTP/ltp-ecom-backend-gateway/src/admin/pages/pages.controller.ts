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
import { CreatePageDto } from './dto/create.dto';
import { DeletePageDto } from './dto/delete.dto';
import { FindAllPageDto } from './dto/find-all.dto';
import { UpdateCompanyInformationDto } from './dto/update-company-information.dto';
import { PagesService } from './pages.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/pages`)
@ApiTags('Admin Pages Management')
@ApiBearerAuth()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @ApiOperation({ summary: 'Find all pages' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindAllPageDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.pagesService.findAll(authorization, request);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get('/init-data')
  @ApiOperation({ summary: 'Init page data' })
  async create(@Headers('Authorization') authorization: string) {
    return await this.pagesService.initData(authorization);
  }

  @Get('/init-slug-data')
  @ApiOperation({ summary: 'Init page slug data' })
  async initSlugData(@Headers('Authorization') authorization: string) {
    return await this.pagesService.initSlugData(authorization);
  }

  // @Post()
  // @ApiOperation({ summary: 'Create new page' })
  // @ApiConsumes('application/json')
  // @ApiBody({
  //   type: CreatePageDto,
  // })
  // async create(
  //   @Body() createBody: CreatePageDto,
  //   @Res() res: Response,
  //   @Headers('Authorization') authorization: string,
  // ) {
  //   const result = await this.pagesService.create(authorization, createBody);
  //   const { code } = result;
  //   res.status(code).send(result);
  // }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get page detail by slug' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findBySlug(
    @Param('slug') slug: string,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.pagesService.findBySlug(authorization, slug);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get('get-company-information')
  @ApiOperation({ summary: 'Get company information' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async getCompanyInformation(
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.pagesService.getCompanyInformation(authorization);
    const { code } = result;
    res.status(code).send(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get page detail' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.pagesService.findOne(authorization, id);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put('update-company-information')
  @ApiOperation({ summary: 'Update company information' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateCompanyInformationDto,
  })
  async updateCompanyInformation(
    @Body() updateBody: UpdateCompanyInformationDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.pagesService.updateCompanyInformation(
      authorization,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update page' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreatePageDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreatePageDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.pagesService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  // @Post('delete')
  // @ApiOperation({ summary: 'Delete pages' })
  // @ApiConsumes('application/x-www-form-urlencoded')
  // @ApiBody({
  //   type: DeletePageDto,
  // })
  // async delete(
  //   @Body('ids') ids: [number],
  //   @Res() res: Response,
  //   @Headers('Authorization') authorization: string,
  // ) {
  //   const result = await this.pagesService.delete(authorization, ids);
  //   const { code } = result;
  //   res.status(code).send(result);
  // }
}
