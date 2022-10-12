import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { FindNewsByCriteriaDto } from './dto/find-by-criteria.dto';
import { NewsService } from './news.service';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('news')
@UseGuards(AuthGuard, PermissionsGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @MessagePattern('admin-news-init-slug-data')
  @Permissions('news')
  async initSlugData() {
    return await this.newsService.initSlugData();
  }

  @MessagePattern('admin-news-find-by-criteria')
  @Permissions('news')
  async findByCriteria({ body }: { body: FindNewsByCriteriaDto }) {
    return await this.newsService.findByCriteria(body);
  }

  @MessagePattern('admin-news-find-by-id')
  @Permissions('news')
  async findById({ id }: { id: number }) {
    return await this.newsService.findById(id);
  }

  @MessagePattern('admin-news-create')
  @Permissions('news')
  async create({ body }: { body: CreateNewsDto }) {
    return await this.newsService.create(body);
  }

  @MessagePattern('admin-news-update')
  @Permissions('news')
  async update({ body }: { body: CreateNewsDto }) {
    return await this.newsService.update(body);
  }

  @MessagePattern('admin-news-delete')
  @Permissions('news')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.newsService.delete(ids);
    return result;
  }
}
