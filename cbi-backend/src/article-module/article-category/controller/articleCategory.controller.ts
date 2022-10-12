import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { LanguageInterceptor } from 'src/common/middlewares/language.interceptor';
import { EnumValidationPipe } from 'src/common/pipes/enum-validation.pipe';
import { TypeUserGroupPipe } from 'src/common/pipes/type-user-group.pipe';
import { ArticleCateResultsDto } from '../dto/article-category-results.dto';
import { ArticleCateDto } from '../dto/articleCategory.dto';
import { CreateArticleCategoryDto } from '../dto/create-article-category.dto';
import { DeleteMultiCategoryArticle } from '../dto/delete-multi-article-category.dto';
import { FindMultiArticleCateDto } from '../dto/find-multi-article-category.dto';
import { ArticleCategoryService } from '../service/articleCategory.service';

@Controller('article-category')
@ApiTags('Article Category')
@UseGuards(JwtAuthGuard)
@UseInterceptors(new LanguageInterceptor())
@LangHeaderDecor()
@ApiBearerAuth()
export class ArticleCategoryController {
  constructor(private readonly articleCateService: ArticleCategoryService) {}

  @Post()
  @Serialize(ArticleCateDto)
  create(
    @Body() createArticleCategoryDto: CreateArticleCategoryDto,
    @AuthAdminReq() admin: AdminJwtDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    return this.articleCateService.create(
      createArticleCategoryDto,
      admin,
      lang,
    );
  }

  @Get('get-all-paging')
  @Public()
  @Serialize(ArticleCateResultsDto)
  async getAllPaging(
    @Query(TypeUserGroupPipe) params: FindMultiArticleCateDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    if (!params.lang) params.lang = lang;

    return this.articleCateService.getAllPaging(params);
  }

  @Get('find-all')
  @Public()
  async findAll(
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    return this.articleCateService.findAll(lang);
  }

  @Get('find/:id')
  @Public()
  @Serialize(ArticleCateDto)
  async findOne(
    @Param('id') id: string,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    return await this.articleCateService.findOne(id, lang);
  }

  @Patch('/:id')
  @Serialize(ArticleCateDto)
  update(
    @Param('id') id: string,
    @Body() updateArticleCategoryDto: CreateArticleCategoryDto,
    @GetLangDecor(new EnumValidationPipe(LangEnum)) lang: LangEnum,
  ) {
    return this.articleCateService.update(
      id,
      updateArticleCategoryDto.name,
      lang,
    );
  }

  @Get('/slug/:slug')
  @Public()
  @Serialize(ArticleCateDto)
  findBySlug(@Param('slug') slug: string) {
    return this.articleCateService.findBySlug(slug);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.articleCateService.remove(id);
  }

  @Delete('delete')
  removeMulti(@Body() params: DeleteMultiCategoryArticle) {
    const { ids } = params;
    return this.articleCateService.removeMulti(ids);
  }
}
