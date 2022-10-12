import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllPageDto } from './dto/find-all.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create.dto';
import { UpdatePageDto } from './dto/update.dto';
import { UpdateCompanyInformationDto } from './dto/update-company-information';

@Controller('pages')
@UseGuards(AuthGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @MessagePattern('admin-pages-find-all')
  async findAll({ body }: { body: FindAllPageDto }) {
    return {
      code: 200,
      data: await this.pagesService.findAll(body),
    };
  }

  @MessagePattern('admin-pages-init-data')
  async initData() {
    return await this.pagesService.initData();
  }

  @MessagePattern('admin-pages-init-slug-data')
  async initSlugData() {
    return await this.pagesService.initSlugData();
  }

  @MessagePattern('admin-pages-create')
  async create({ body }: { body: CreatePageDto }) {
    return await this.pagesService.create(body);
  }

  @MessagePattern('admin-pages-find-one')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.pagesService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Page not found',
    };
  }

  @MessagePattern('admin-pages-find-by-slug')
  async findBySlug({ body }) {
    const { slug } = body;
    const result = await this.pagesService.findBySlug(slug);
    return {
      code: result ? 200 : 404,
      data: result || 'Page not found',
    };
  }

  @MessagePattern('admin-pages-update-one')
  async updateOne({ body }: { body: UpdatePageDto }) {
    const result = await this.pagesService.update(body);
    return result;
  }

  @MessagePattern('admin-pages-delete')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.pagesService.delete(ids);
    return result;
  }

  @MessagePattern('admin-get-company-information')
  async getCompanyInformation() {
    const result = await this.pagesService.getCompanyInformation();
    return result;
  }

  @MessagePattern('admin-update-company-information')
  async updateCompanyInformation({
    body,
  }: {
    body: UpdateCompanyInformationDto;
  }) {
    const result = await this.pagesService.updateCompanyInformation(body);
    return result;
  }
}
