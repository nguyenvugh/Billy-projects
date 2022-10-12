import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { NewsCategoryService } from './news-category.service';
import { Response } from 'express';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CreateNewsCategoryDto } from './dto/create.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/news-category`)
@ApiTags('Admin News Category Management')
@ApiBearerAuth()
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Get('init-slug-data')
  @ApiOperation({ summary: 'Init slug data of news category' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async initSlugData(@Headers('Authorization') authorization: string) {
    return await this.newsCategoryService.initSlugData(authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news category' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsCategoryService.findAll(authorization);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new news category' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateNewsCategoryDto,
  })
  async create(
    @Body() createBody: CreateNewsCategoryDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsCategoryService.create(
      authorization,
      createBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update news category' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateNewsCategoryDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateNewsCategoryDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsCategoryService.update(
      authorization,
      id,
      updateBody,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete news categories' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsCategoryService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
