import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepository } from 'src/news/repositories/news.repository';
import { NewsCategoryController } from './news-category.controller';
import { NewsCategoryService } from './news-category.service';
import { NewsCategoryTranslateRepository } from './repositories/news-category-translate.repository';
import { NewsCategorySlugHistoryRepository } from './repositories/news-category-slug-history.repository';
import { NewsCategoryRepository } from './repositories/news-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryRepository,
      NewsCategoryTranslateRepository,
      NewsCategorySlugHistoryRepository,
      NewsRepository,
    ]),
  ],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService],
})
export class NewsCategoryModule {}
