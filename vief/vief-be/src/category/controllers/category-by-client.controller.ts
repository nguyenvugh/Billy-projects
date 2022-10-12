import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangEnum } from '../../common/constants/global.constant';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { CategoryService } from '../category.service';
import { GetAllCategoryDto } from '../dto/req/get-all-category.dto';
import { ResGetListCategories } from '../dto/res/get-list-categories.dto';

@Controller('client/category')
@ApiTags('Category client')
export class CategoryByClientController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @ManualSerialize(ResGetListCategories)
  async getAll(
    @Query() getCategory: GetAllCategoryDto,
    @Headers('lang') lang: LangEnum,
  ) {
    return this.categoryService.getAllCategoryClient(getCategory, lang);
  }
}
