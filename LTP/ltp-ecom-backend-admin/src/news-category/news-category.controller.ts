import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { NewsCategoryService } from './news-category.service';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
@Controller('news-category')
@UseGuards(AuthGuard, PermissionsGuard)
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @MessagePattern('admin-news-category-init-slug-data')
  @Permissions('news_category')
  async initSlugData() {
    return await this.newsCategoryService.initSlugData();
  }

  @MessagePattern('admin-news-category-find-all')
  @Permissions('news_category')
  async findAll() {
    return {
      code: 200,
      data: await this.newsCategoryService.findAll(),
    };
  }

  @MessagePattern('admin-news-category-create')
  @Permissions('news_category')
  async create({ body }: { body: CreateNewsCategoryDto }) {
    return await this.newsCategoryService.create(body);
  }

  @MessagePattern('admin-news-category-update')
  @Permissions('news_category')
  async update({ body }) {
    const { id, data } = body;
    return await this.newsCategoryService.update(id, data);
  }

  @MessagePattern('admin-news-category-delete')
  @Permissions('news_category')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.newsCategoryService.delete(ids);
    return result;
  }
}
