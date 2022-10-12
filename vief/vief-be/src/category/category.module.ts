import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';
import { UtilsModule } from '../utils-module/utils.module';
import { CategoryService } from './category.service';
import { CategoryByAdminController } from './controllers/category-by-admin.controller';
import { CategoryByClientController } from './controllers/category-by-client.controller';
import { CategoryTranslation } from './entities/category-translation.entity';
import { Category } from './entities/category.entity';
import { CategoryTranslationRepository } from './repository/category-translate.repository';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      CategoryTranslation,
      FileRepository,
      CategoryTranslationRepository,
      CategoryRepository,
    ]),
    UtilsModule,
    HttpModule,
  ],

  controllers: [CategoryByAdminController, CategoryByClientController],
  providers: [CategoryService, FileService],
})
export class CategoryModule {}
