import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils-module/utils.module';
import { FileModule } from '../../file/file.module';
import { ArticleModule } from '../article/article.module';
import { ArticleCategoryController } from './controller/articleCategory.controller';
import { ArticleCategory } from './entitiy/article_category.entity';
import { ArticleCategoryTranslation } from './entitiy/article_cetegory_translation.entity';
import { ArticleCategoryService } from './service/articleCategory.service';
import { ArticleCategoryTranslationSubscriber } from './subscriber/article-category-translation.subscriber';

@Module({
  imports: [
    UtilsModule,
    FileModule,
    forwardRef(() => ArticleModule),
    TypeOrmModule.forFeature([ArticleCategory, ArticleCategoryTranslation]),
  ],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService, ArticleCategoryTranslationSubscriber],
  exports: [TypeOrmModule, ArticleCategoryService],
})
export class ArticleCategoryModule {}
