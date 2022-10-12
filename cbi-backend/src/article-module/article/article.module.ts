import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { UtilsModule } from 'src/utils-module/utils.module';
import { ArticleCategoryModule } from '../article-category/articleCategory.module';
import { ArticleController } from './controller/article.controller';
import { Article } from './entity/article.entity';
import { ArticleToCategory } from './entity/articleToCategory.entity';
import { ArticleTranslation } from './entity/articleTranslation.entity';
import { ArticleService } from './service/article.service';
import { ArticleTranslationSubscriber } from './subscriber/article-translation.subscriber';

@Module({
  imports: [
    UtilsModule,
    forwardRef(() => ArticleCategoryModule),
    // ArticleCategoryModule,
    FileModule,
    TypeOrmModule.forFeature([Article, ArticleTranslation, ArticleToCategory]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleTranslationSubscriber],
  exports: [TypeOrmModule, ArticleService],
})
export class ArticleModule {}
