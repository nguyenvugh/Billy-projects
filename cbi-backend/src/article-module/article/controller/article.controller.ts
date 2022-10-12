import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminReq } from 'src/auth/decorator/auth-req.decorator';
import { AdminJwtDto } from 'src/auth/dto/admin-jwt.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LangEnum } from 'src/common/constants/global.constant';
import {
  GetLangDecor,
  LangHeaderDecor,
} from 'src/common/decorators/lang-header.decorator';
import { Public } from 'src/common/decorators/public-api.decorator';
import { ManualSerialize } from 'src/common/interceptors/serialize.interceptor';
import { LanguageInterceptor } from 'src/common/middlewares/language.interceptor';
import { EnumValidationPipe } from 'src/common/pipes/enum-validation.pipe';
import { TypeUserGroupPipe } from 'src/common/pipes/type-user-group.pipe';
import { ArticleResultsDto } from '../dto/article-results.dto';
import { ArticleDto } from '../dto/article.dto';
import { CreateArticleDto } from '../dto/create-article.dto';
import { DeleteMultiArticleDto } from '../dto/delete-multi-article.dto';
import { FindArticleDto } from '../dto/find-article.dto';
import { FindMultiArticleDto } from '../dto/find-multi-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleService } from '../service/article.service';

@Controller('article')
@ApiTags('Article')
@ApiBearerAuth()
@UseInterceptors(new LanguageInterceptor())
@UseGuards(JwtAuthGuard)
@LangHeaderDecor()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ManualSerialize(ArticleDto)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @AuthAdminReq() admin: AdminJwtDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    createArticleDto.lang = lang;
    return await this.articleService.create(createArticleDto, admin);
  }

  @Get()
  @Public()
  @ManualSerialize(ArticleResultsDto)
  async getAllPaging(
    @Query(TypeUserGroupPipe) params: FindMultiArticleDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    /**
     * If param lang is not exist, we will use default lang header.
     */
    if (!params.lang) params.lang = lang;
    return await this.articleService.getAllPaging(params);
  }

  @Get('/:id')
  @Public()
  @ManualSerialize(ArticleDto)
  async findOne(
    @Param('id') id: string,
    @Query() params: FindArticleDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    if (!params.lang) params.lang = lang;
    return await this.articleService.findOne(id, params);
  }

  @Get('/slug/:slug')
  @Public()
  @ManualSerialize(ArticleDto)
  async findBySlug(
    @Param('slug') slug: string,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    return await this.articleService.findBySlug(slug, lang);
  }

  @Patch('/:id')
  @ManualSerialize(ArticleDto)
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @AuthAdminReq() admin: AdminJwtDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    updateArticleDto.lang = lang;
    return await this.articleService.update(id, updateArticleDto, admin);
  }

  @Put('change-status/:id')
  @ManualSerialize(ArticleDto)
  async changeStatus(@Param('id') id: string) {
    return await this.articleService.changeStatus(id);
  }

  @Delete()
  async deleteArticleByIds(@Body() body: DeleteMultiArticleDto) {
    return await this.articleService.deleteArticleByIds(body.ids);
  }

  @Get('check/is-full-published')
  @Public()
  async checkIsFullPublishedArticle(
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    return await this.articleService.checkIsFullPublishedArticle(lang);
  }
}
