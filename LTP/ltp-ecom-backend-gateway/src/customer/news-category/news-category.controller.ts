import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { CurrentLang } from 'src/common/decorators/current-lang.decorator';
import { FindAllNewsByCategoryDto } from './dto/find-one.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { NewsCategoryService } from './news-category.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/news-category`)
@ApiTags('Customer News Category')
@UseInterceptors(ClassSerializerInterceptor)
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Get('find-slug-other-lang')
  @ApiOperation({ summary: 'Get news category slug in other lang' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findSlugOtherLang(
    @CurrentLang() curLang,
    @Query() reqData: FindSLugOtherLangDto,
  ) {
    return await this.newsCategoryService.findSlugOtherLang(curLang, reqData);
  }

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Get list news by news category slug on web customer',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOneBySlug(
    @CurrentLang() curLang,
    @Param('slug') slug: string,
    @Query() reqData: FindAllNewsByCategoryDto,
  ) {
    return await this.newsCategoryService.findOneBySlug(curLang, slug, reqData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get list news by category on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @CurrentLang() curLang,
    @Param('id') id: number,
    @Query() reqData: FindAllNewsByCategoryDto,
  ) {
    return await this.newsCategoryService.findOne(curLang, id, reqData);
  }
}
