import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { NewsCategoryController } from './news-category.controller';
import { NewsCategoryService } from './news-category.service';

@Module({
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService],
  imports: [MicroserviceModule],
})
export class NewsCategoryModule {}
