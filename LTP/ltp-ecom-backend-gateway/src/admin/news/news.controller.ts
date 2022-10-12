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
import { CreateNewsDto } from './dto/create.dto';
import { DeleteNewsDto } from './dto/delete.dto';
import { FindNewsByCriteriaDto } from './dto/find-by-criteria.dto';
import { NewsService } from './news.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/news`)
@ApiTags('Admin News Management')
@ApiBearerAuth()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('init-slug-data')
  @ApiOperation({ summary: 'Init slug data of news' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async initSlugData(@Headers('Authorization') authorization: string) {
    return await this.newsService.initSlugData(authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Find news by criteria' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findByCriteria(
    @Query() request: FindNewsByCriteriaDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsService.findByCriteria(
      authorization,
      request,
    );
    const { code } = result;
    res.status(code).send(result);
  }

  @Post()
  @ApiOperation({ summary: 'Create new news' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateNewsDto,
  })
  async create(
    @Body() createBody: CreateNewsDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsService.create(authorization, createBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update news' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateNewsDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateBody: CreateNewsDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsService.update(authorization, id, updateBody);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete news' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: DeleteNewsDto,
  })
  async delete(
    @Body('ids') ids: [number],
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.newsService.delete(authorization, ids);
    const { code } = result;
    res.status(code).send(result);
  }
}
