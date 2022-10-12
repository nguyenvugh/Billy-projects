import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { ArticleService } from '../article.service';
import { CreateArticleDto } from '../dto/req/admin/create-article.dto';
import { DeleteArticlesDto } from '../dto/req/admin/delete-articles.dto';
import { EditArticleDto } from '../dto/req/admin/edit-article.dto';
import { GetListArticleDto } from '../dto/req/admin/get-list-articles.dto';
import { ResGetArticle } from '../dto/res/admin/get-article.dto';
import { ResGetListArticle } from '../dto/res/admin/get-list-article.dto';

@Controller('admin/article')
@ApiTags('Article admin')
export class ArticleByAdminController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async createArticle(@Body() createArticle: CreateArticleDto) {
    return this.articleService.createArticle(createArticle);
  }

  @Get(':id')
  @ManualSerialize(ResGetArticle)
  async getArticleById(@Param('id') id: number) {
    return this.articleService.getArticleById(id);
  }

  @Get()
  @ManualSerialize(ResGetListArticle)
  async getArticles(@Query() getListArticle: GetListArticleDto) {
    return this.articleService.getListArticleByAdmin(getListArticle);
  }

  @Delete()
  async deleteArticles(@Body() { id }: DeleteArticlesDto) {
    return this.articleService.deleteArticles(id);
  }

  @Patch(':id')
  async editArticle(
    @Body() editArticle: EditArticleDto,
    @Param('id') id: number,
  ) {
    return this.articleService.editArticle(editArticle, id);
  }
}
