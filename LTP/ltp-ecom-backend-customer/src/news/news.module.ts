import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategory } from 'src/news-category/schemas/news-category.schema';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsTranslateRepository } from './repositories/news-translate.repository';
import { NewsSlugHistoryRepository } from './repositories/news-slug-history.repository';
import { NewsRepository } from './repositories/news.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsRepository,
      NewsTranslateRepository,
      NewsSlugHistoryRepository,
    ]),
    TypeOrmModule.forFeature([NewsCategory]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
