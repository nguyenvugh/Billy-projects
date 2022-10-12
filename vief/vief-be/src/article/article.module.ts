import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { CategoryTranslationRepository } from '../category/repository/category-translate.repository';
import { CategoryRepository } from '../category/repository/category.repository';
import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';
import { UtilsModule } from '../utils-module/utils.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleByAdminController } from './controllers/article-by-admin.controller';
import { ArticleByClientController } from './controllers/article-by-client.controller';
import { ArticleTranslationRepository } from './repository/article-translation.repository';
import { ArticleRepository } from './repository/article.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleTranslationRepository,
      ArticleRepository,
      FileRepository,
      CategoryRepository,
      CategoryTranslationRepository,
    ]),
    UtilsModule,
    HttpModule,
  ],
  controllers: [
    ArticleController,
    ArticleByClientController,
    ArticleByAdminController,
  ],
  providers: [ArticleService, FileService, CategoryService],
})
export class ArticleModule {}
