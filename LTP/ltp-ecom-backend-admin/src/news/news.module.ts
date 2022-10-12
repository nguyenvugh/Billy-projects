import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { NewsCategory } from '../news-category/schemas/news-category.schema';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsTranslateRepository } from './repositories/news-translate.repository';
import { NewsSlugHistoryRepository } from './repositories/news-slug-history.repository';
import { NewsRepository } from './repositories/news.repository';
import { SlugService } from '../common/services/slug.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsRepository,
      NewsTranslateRepository,
      NewsSlugHistoryRepository,
    ]),
    TypeOrmModule.forFeature([NewsCategory]),
    JwtCoreModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, SlugService],
})
export class NewsModule {}
