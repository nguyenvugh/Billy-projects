import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainMenuService } from './main-menu.service';
import { MainMenuController } from './main-menu.controller';
import { ProductCategoryRepository } from '../product-category/repository/product-category.repository';
import { NewsRepository } from '../news/repositories/news.repository';
import { NewsCategoryRepository } from '../news-category/repositories/news-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryRepository,
      NewsRepository,
      NewsCategoryRepository,
    ]),
  ],
  controllers: [MainMenuController],
  providers: [MainMenuService],
})
export class MainMenuModule {}
