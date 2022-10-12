import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto/req/create-category.dto';
import { DeleteCategoriesDto } from '../dto/req/delete-categories.dto';
import { EditCategoryDto } from '../dto/req/edit-category.dto';
import { GetAllCategoryDto } from '../dto/req/get-all-category.dto';
import { ResGetCategory } from '../dto/res/admin/get-category.dto';
import { ResGetListCategories } from '../dto/res/get-list-categories.dto';

@Controller('admin/category')
@ApiTags('Category admin')
export class CategoryByAdminController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @ManualSerialize(ResGetListCategories)
  async getAll(@Query() getCategory: GetAllCategoryDto) {
    return this.categoryService.getAllCategoryByAdmin(getCategory);
  }

  @Get(':id')
  @ManualSerialize(ResGetCategory)
  async getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Delete()
  async deleteCategories(@Body() { id }: DeleteCategoriesDto) {
    return this.categoryService.deleteCategories(id);
  }

  @Patch(':id')
  async updateCategory(
    @Body() editCategory: EditCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoryService.editCategory(editCategory, id);
  }
}
