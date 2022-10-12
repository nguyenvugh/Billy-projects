import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { NewsCategoryController } from './news-category.controller';
import { NewsCategoryService } from './news-category.service';
import { NewsCategoryTranslateRepository } from './repositories/news-category-translate.repository';
import { NewsCategorySlugHistoryRepository } from './repositories/news-category-slug-history.repository';
import { NewsCategoryRepository } from './repositories/news-category.repository';
import { SlugService } from '../common/services/slug.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryRepository,
      NewsCategoryTranslateRepository,
      NewsCategorySlugHistoryRepository,
    ]),
    JwtCoreModule,
  ],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService, SlugService],
})
export class NewsCategoryModule {}
